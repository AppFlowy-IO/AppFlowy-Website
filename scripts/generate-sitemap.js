const fs = require('fs');
const path = require('path');
const prettier = require('prettier');

const getPages = () => {
  const pagesDirectory = path.join(process.cwd(), 'app');
  const pages = [];

  const traverseDirectory = (dir, route = '') => {
    const files = fs.readdirSync(dir);

    files.forEach((file) => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        if (!['api', '.well-known'].includes(file)) {
          traverseDirectory(filePath, path.join(route, file));
        }
      } else if (stat.isFile() && (file.endsWith('.ts') || file.endsWith('.tsx')) && !file.startsWith('_')) {
        const pageRoute = route.replace(/\/page$/, '') || '/';
        pages.push(pageRoute);
      }
    });
  };

  traverseDirectory(pagesDirectory);
  return pages;
};

// 生成 sitemap XML
const generateSitemap = async () => {
  const pages = getPages();
  const siteUrl = 'https://appflowy.io';

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages
        .map((page) => {
          const normalizedPath = page.replace(/\\/g, '/').replace(/^\//, '');
          return `
            <url>
              <loc>${siteUrl}/${normalizedPath}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>weekly</changefreq>
              <priority>1.0</priority>
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
};

generateSitemap();
