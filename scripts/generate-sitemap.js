const fs = require('fs');
const path = require('path');
const prettier = require('prettier');
const matter = require('gray-matter');
const { slugify, canonicalTemplatePath, buildTemplateSlugMap } = require('../lib/template-canonical');
const { REGISTRY_FILE, readRegistry, syncRegistry, writeRegistry } = require('./template-slug-registry');

const SITE_URL = 'https://appflowy.com';
const BLOG_PAGE_SIZE = 12;
const BLOG_TOPIC_SLUGS = [
  'alternatives',
  'knowledge-management',
  'open-source-engineering',
  'private-ai',
  'product-updates',
  'project-management',
  'self-hosting',
];

// Same default as lib/templateAPI.ts. The sitemap describes production, so only
// override this when pointing the script at a different template backend.
const API_BASE_URL = process.env.SITEMAP_API_BASE_URL || 'https://beta.appflowy.cloud';

const TEMPLATE_API = `${API_BASE_URL}/api/template-center`;

const EXCLUDED_STATIC_ROUTES = new Set([
  // Utility and conversion pages should not compete with their canonical destinations.
  'downloaded',
  'invitation/expired',
]);

/**
 * Static routes: every `page.tsx` under `app/`.
 *
 * Dynamic segments are skipped here and expanded from their real data sources
 * below, so `/blog/[slug]` never reaches the sitemap as a literal URL.
 */
const getStaticRoutes = () => {
  const pagesDirectory = path.join(process.cwd(), 'app');
  const routes = [];

  const traverseDirectory = (dir, route = '') => {
    fs.readdirSync(dir).forEach((file) => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        if (!['api', '.well-known'].includes(file)) {
          traverseDirectory(filePath, path.join(route, file));
        }
      } else if (stat.isFile() && /^page\.tsx?$/.test(file)) {
        // Only `page.tsx` defines a route. Co-located files (components/,
        // config/, layout.tsx, route.ts) are not pages and must not become URLs.
        const pageRoute = route.replace(/\\/g, '/');

        if (pageRoute.includes('[') || EXCLUDED_STATIC_ROUTES.has(pageRoute)) return;

        routes.push({ path: pageRoute });
      }
    });
  };

  traverseDirectory(pagesDirectory);
  return routes;
};

/**
 * Blog posts, read from the local `_blog/*.mdx` files.
 *
 * The slug rule and the `unpublished` / `archived` filters mirror lib/posts.ts — keep them in
 * sync, or the sitemap will advertise URLs that 404.
 */
const getBlogRoutes = () => {
  const postsDirectory = path.join(process.cwd(), '_blog');
  const posts = fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const { data } = matter(fs.readFileSync(path.join(postsDirectory, fileName), 'utf8'));

      // Filenames are `YYYY-MM-DD-the-slug.mdx`; drop the three date segments.
      const [, , , ...rest] = fileName.replace(/\.mdx$/, '').split('-');

      return {
        slug: rest.join('-'),
        path: `blog/${rest.join('-')}`,
        lastmod: data.last_modified || data.date,
        unpublished: Boolean(data.unpublished),
        archived: Boolean(data.archived),
        pinned: Number(data.pinned) || 0,
        date: data.date,
        topics: Array.isArray(data.topics) ? data.topics : [],
      };
    })
    .filter((post) => !post.unpublished && !post.archived)
    .sort((first, second) => new Date(second.date).getTime() - new Date(first.date).getTime());

  const articleRoutes = posts.map(({ path, lastmod }) => ({ path, lastmod }));
  const featuredPost = posts.filter((post) => post.pinned > 0).sort((a, b) => a.pinned - b.pinned)[0] || posts[0];
  const archivePosts = featuredPost ? posts.filter((post) => post.slug !== featuredPost.slug) : posts;
  const totalPages = Math.max(1, Math.ceil(archivePosts.length / BLOG_PAGE_SIZE));
  const paginationRoutes = Array.from({ length: Math.max(0, totalPages - 1) }, (_, index) => {
    const page = index + 2;
    const pagePosts = archivePosts.slice((page - 1) * BLOG_PAGE_SIZE, page * BLOG_PAGE_SIZE);

    return {
      path: `blog/page/${page}`,
      lastmod: pagePosts.reduce((latest, post) => {
        const value = new Date(post.lastmod).getTime();

        return value > new Date(latest).getTime() ? post.lastmod : latest;
      }, pagePosts[0]?.lastmod),
    };
  });
  const latestPostDate = posts.reduce((latest, post) => {
    const value = new Date(post.lastmod).getTime();

    return value > new Date(latest).getTime() ? post.lastmod : latest;
  }, posts[0]?.lastmod);
  const collectionRoutes = [
    { path: 'blog', lastmod: latestPostDate },
    ...BLOG_TOPIC_SLUGS.map((topicSlug) => {
      const topicPosts = posts.filter((post) => post.topics.includes(topicSlug));

      return {
        path: `blog/${topicSlug}`,
        lastmod: topicPosts.reduce((latest, post) => {
          const value = new Date(post.lastmod).getTime();

          return value > new Date(latest).getTime() ? post.lastmod : latest;
        }, topicPosts[0]?.lastmod),
      };
    }),
  ];

  return [...articleRoutes, ...paginationRoutes, ...collectionRoutes];
};

const fetchJson = async (url) => {
  const res = await fetch(url, { headers: { 'Content-Type': 'application/json' } });

  if (!res.ok) throw new Error(`${res.status} ${res.statusText} from ${url}`);

  return res.json();
};

/**
 * Template categories and templates, fetched from the template center API.
 *
 * Each template has exactly one URL — `/templates/<slug>` — so it is listed once, with
 * no category in the path. Unfiltered, the list endpoint returns every template with its
 * complete `categories` array, so this needs two requests rather than one per category
 * plus one per template.
 *
 * Slugs come from buildTemplateSlugMap() in lib/template-canonical.js, the same function
 * app/templates/[slug] resolves against — the sitemap must only ever list the URL the
 * page itself declares as canonical. Unpublished templates are dropped by that function,
 * which is why they no longer reach the sitemap.
 *
 * This is also where the slug registry learns about new templates: it is the one step that
 * sees the full live template list. The synced registry is returned for the caller to write.
 */
const getTemplateRoutes = async (registry = readRegistry()) => {
  const [{ data: categoryData }, { data: templateData }] = await Promise.all([
    fetchJson(`${TEMPLATE_API}/category`),
    fetchJson(`${TEMPLATE_API}/template`),
  ]);
  const categories = categoryData.categories;
  const templates = templateData.templates;

  const routes = categories.map((category) => ({
    path: `templates/${slugify(category.name)}`,
  }));

  const { registry: syncedRegistry, notes } = syncRegistry(registry, templates, categories);
  const { viewIdToSlug } = buildTemplateSlugMap(templates, categories, syncedRegistry);

  // A view-id suffix means two live templates share a name. The URL is still stable, but
  // it is a content problem worth surfacing — renaming one upstream restores a clean slug.
  templates.forEach((template) => {
    const slug = viewIdToSlug.get(template.view_id);

    if (slug && slug.endsWith(template.view_id.slice(0, 8))) {
      console.warn(`Duplicate template name "${template.name}" resolved to ${slug}; consider renaming it.`);
    }
  });

  templates.forEach((template) => {
    const canonicalPath = canonicalTemplatePath(viewIdToSlug.get(template.view_id));

    if (!canonicalPath) return;

    routes.push({
      path: canonicalPath.slice(1),
      lastmod: template.publish_info && template.publish_info.publish_timestamp,
    });
  });

  return { routes, registry: syncedRegistry, notes };
};

/**
 * Local development can run without access to the production template API.
 * This explicit fallback preserves template entries from the last generated
 * sitemap while static and blog routes are rebuilt from current source files.
 * Production builds do not use it, so publishing still fails closed when fresh
 * template data cannot be fetched.
 */
const getExistingTemplateRoutes = () => {
  const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');

  if (!fs.existsSync(sitemapPath)) {
    throw new Error(`No existing sitemap found at ${sitemapPath}`);
  }

  const sitemap = fs.readFileSync(sitemapPath, 'utf8');
  const urlBlocks = sitemap.match(/<url>[\s\S]*?<\/url>/g) || [];
  const readElement = (block, name) => block.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)<\\/${name}\\s*>`))?.[1].trim();

  return urlBlocks.flatMap((block) => {
    const location = readElement(block, 'loc');

    if (!location) return [];

    const url = new URL(location);

    // The /templates index is a static route and is regenerated separately.
    if (!url.pathname.startsWith('/templates/')) return [];

    return [
      {
        path: url.pathname.replace(/^\//, ''),
        // Categories and templates now share one path depth, so a lastmod is only
        // trustworthy when the previous sitemap recorded one at all. Category pages
        // never had one.
        lastmod: readElement(block, 'lastmod'),
      },
    ];
  });
};

const toIsoDate = (value) => {
  const date = value ? new Date(value) : null;

  return date && !isNaN(date.getTime()) ? date.toISOString() : undefined;
};

const normalizeRoutes = (routes) => {
  const routesByPath = new Map();

  routes.forEach((route) => {
    const normalizedPath = route.path.replace(/^\/+|\/+$/g, '');

    const existingRoute = routesByPath.get(normalizedPath);

    routesByPath.set(normalizedPath, {
      ...existingRoute,
      ...route,
      path: normalizedPath,
      lastmod: route.lastmod || existingRoute?.lastmod,
    });
  });

  return [...routesByPath.values()].sort((first, second) => {
    if (!first.path) return -1;
    if (!second.path) return 1;

    return first.path.localeCompare(second.path);
  });
};

const escapeXml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const generateSitemap = async () => {
  const skipTemplates = process.argv.includes('--skip-templates');
  const reuseExistingTemplates = process.argv.includes('--reuse-existing-templates');

  let templateRoutes = [];

  if (skipTemplates) {
    console.warn('Skipping template URLs (--skip-templates).');
  } else if (reuseExistingTemplates) {
    try {
      templateRoutes = getExistingTemplateRoutes();
      console.warn(`Reusing ${templateRoutes.length} template URLs from public/sitemap.xml.`);
    } catch (error) {
      console.error(`Failed to reuse existing template URLs: ${error.message}`);
      process.exitCode = 1;
      return;
    }
  } else {
    try {
      const { routes, registry, notes } = await getTemplateRoutes();

      templateRoutes = routes;
      writeRegistry(registry);
      notes.forEach((note) => console.log(`${REGISTRY_FILE}: ${note}`));
    } catch (error) {
      // Writing a sitemap that silently drops every template URL is worse than
      // not writing one, so fail loudly instead of quietly shrinking the file.
      console.error(`Failed to fetch templates from ${TEMPLATE_API}: ${error.message}`);
      console.error(
        'Re-run with --reuse-existing-templates to preserve cached template URLs, or --skip-templates to omit them.'
      );
      process.exitCode = 1;
      return;
    }
  }

  const staticRoutes = getStaticRoutes();
  const blogRoutes = getBlogRoutes();
  const routes = normalizeRoutes([...staticRoutes, ...blogRoutes, ...templateRoutes]);

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${routes
        .map((route) => {
          const lastmod = toIsoDate(route.lastmod);

          return `
            <url>
              <loc>${escapeXml(`${SITE_URL}/${route.path}`)}</loc>
              ${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}
            </url>
          `;
        })
        .join('')}
    </urlset>
  `;

  const prettierConfig = await prettier.resolveConfig('./.prettierrc.js');
  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: 'html',
  });

  fs.writeFileSync('public/sitemap.xml', formatted);

  console.log(
    `Wrote public/sitemap.xml: ${routes.length} URLs ` +
      `(${staticRoutes.length} static, ${blogRoutes.length} blog, ${templateRoutes.length} template; deduplicated).`
  );
};

if (require.main === module) generateSitemap();

module.exports = { getTemplateRoutes };
