const fs = require('fs');
const path = require('path');
const prettier = require('prettier');
const matter = require('gray-matter');

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

// Mirrors slugify() in components/template-center/utils.ts.
const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');

const fetchJson = async (url) => {
  const res = await fetch(url, { headers: { 'Content-Type': 'application/json' } });

  if (!res.ok) throw new Error(`${res.status} ${res.statusText} from ${url}`);

  return res.json();
};

/**
 * Template categories and templates, fetched from the template center API.
 *
 * A template belongs to several categories and is reachable under each of them,
 * so we list each one exactly once, under its alphabetically first category.
 *
 * This must match canonicalTemplatePath() in components/template-center/utils.ts,
 * which is what the page declares as its canonical URL — the sitemap should only
 * ever list the URL the page itself points at.
 */
const getTemplateRoutes = async () => {
  const { data: categoryData } = await fetchJson(`${TEMPLATE_API}/category`);
  const categories = categoryData.categories;

  const routes = categories.map((category) => ({
    path: `templates/${slugify(category.name)}`,
  }));

  const templateLists = await Promise.all(
    categories.map(async (category) => {
      const { data } = await fetchJson(`${TEMPLATE_API}/template?category_id=${category.id}`);

      return data.templates;
    })
  );

  const viewIds = [...new Set(templateLists.flat().map((template) => template.view_id))];

  // The list endpoint only echoes back the category it was filtered by, so the
  // full category set has to come from the detail endpoint — otherwise we'd pick
  // a different canonical than the page does.
  const templates = await Promise.all(
    viewIds.map(async (viewId) => {
      const { data } = await fetchJson(`${TEMPLATE_API}/template/${viewId}`);

      return data;
    })
  );

  templates.forEach((template) => {
    const canonicalCategory = [...template.categories].sort((a, b) => a.name.localeCompare(b.name))[0];

    if (!canonicalCategory) return;

    routes.push({
      path: `templates/${slugify(canonicalCategory.name)}/${template.view_id}`,
      lastmod: template.publish_info && template.publish_info.publish_timestamp,
    });
  });

  return routes;
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
    const pathSegments = url.pathname.split('/').filter(Boolean);

    // The /templates index is a static route and is regenerated separately.
    if (!url.pathname.startsWith('/templates/')) return [];

    return [
      {
        path: url.pathname.replace(/^\//, ''),
        // Category pages do not have a trustworthy modification timestamp.
        // Preserve publish timestamps only for individual template pages.
        lastmod: pathSegments.length > 2 ? readElement(block, 'lastmod') : undefined,
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
      templateRoutes = await getTemplateRoutes();
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

generateSitemap();
