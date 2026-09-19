const fs = require('fs');
const path = require('path');
const prettier = require('prettier');
const matter = require('gray-matter');

const SITE_URL = 'https://appflowy.com';

// Same default as lib/templateAPI.ts. The sitemap describes production, so only
// override this when pointing the script at a different template backend.
const API_BASE_URL = process.env.SITEMAP_API_BASE_URL || 'https://beta.appflowy.cloud';

const TEMPLATE_API = `${API_BASE_URL}/api/template-center`;

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

        if (pageRoute.includes('[')) return;

        routes.push({ path: pageRoute, priority: '1.0', changefreq: 'weekly' });
      }
    });
  };

  traverseDirectory(pagesDirectory);
  return routes;
};

/**
 * Blog posts, read from the local `_blog/*.mdx` files.
 *
 * The slug rule and the `unpublished` filter mirror lib/posts.ts — keep them in
 * sync, or the sitemap will advertise URLs that 404.
 */
const getBlogRoutes = () => {
  const postsDirectory = path.join(process.cwd(), '_blog');

  return fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const { data } = matter(fs.readFileSync(path.join(postsDirectory, fileName), 'utf8'));

      // Filenames are `YYYY-MM-DD-the-slug.mdx`; drop the three date segments.
      const [, , , ...rest] = fileName.replace(/\.mdx$/, '').split('-');

      return {
        path: `blog/${rest.join('-')}`,
        lastmod: data.last_modified || data.date,
        unpublished: Boolean(data.unpublished),
        priority: '0.7',
        changefreq: 'monthly',
      };
    })
    .filter((post) => !post.unpublished);
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
    priority: '0.8',
    changefreq: 'monthly',
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
      priority: '0.6',
      changefreq: 'monthly',
    });
  });

  return routes;
};

const toIsoDate = (value) => {
  const date = value ? new Date(value) : null;

  return date && !isNaN(date.getTime()) ? date.toISOString() : new Date().toISOString();
};

const generateSitemap = async () => {
  const skipTemplates = process.argv.includes('--skip-templates');

  let templateRoutes = [];

  if (skipTemplates) {
    console.warn('Skipping template URLs (--skip-templates).');
  } else {
    try {
      templateRoutes = await getTemplateRoutes();
    } catch (error) {
      // Writing a sitemap that silently drops every template URL is worse than
      // not writing one, so fail loudly instead of quietly shrinking the file.
      console.error(`Failed to fetch templates from ${TEMPLATE_API}: ${error.message}`);
      console.error('Re-run with --skip-templates to write a sitemap without them.');
      process.exitCode = 1;
      return;
    }
  }

  const staticRoutes = getStaticRoutes();
  const blogRoutes = getBlogRoutes();
  const routes = [...staticRoutes, ...blogRoutes, ...templateRoutes];

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${routes
      .map((route) => {
        const normalizedPath = route.path.replace(/^\//, '');

        return `
            <url>
              <loc>${SITE_URL}/${normalizedPath}</loc>
              <lastmod>${toIsoDate(route.lastmod)}</lastmod>
              <changefreq>${route.changefreq}</changefreq>
              <priority>${route.priority}</priority>
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
    `(${staticRoutes.length} static, ${blogRoutes.length} blog, ${templateRoutes.length} template).`
  );
};

generateSitemap();
