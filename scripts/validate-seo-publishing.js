const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const SITE_URL = 'https://appflowy.com';
const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
const robotsPath = path.join(process.cwd(), 'public', 'robots.txt');
const postsDirectory = path.join(process.cwd(), '_blog');
const errors = [];
const BLOG_PAGE_SIZE = 12;

const sitemap = fs.readFileSync(sitemapPath, 'utf8');
const urlBlocks = sitemap.match(/<url>[\s\S]*?<\/url>/g) || [];
const urls = urlBlocks.flatMap((block) => {
  const match = block.match(/<loc[^>]*>([\s\S]*?)<\/loc\s*>/);

  return match ? [match[1].replace(/\s/g, '')] : [];
});
const urlSet = new Set(urls);
const sitemapEntries = new Map(
  urlBlocks.flatMap((block) => {
    const location = block.match(/<loc[^>]*>([\s\S]*?)<\/loc\s*>/)?.[1].replace(/\s/g, '');
    const lastmod = block.match(/<lastmod[^>]*>([\s\S]*?)<\/lastmod\s*>/)?.[1].trim();

    return location ? [[location, { lastmod }]] : [];
  })
);

if (urls.length !== urlBlocks.length) {
  errors.push(`sitemap contains ${urlBlocks.length - urls.length} URL entries without a valid <loc>`);
}

const duplicateUrls = [...new Set(urls.filter((url, index) => urls.indexOf(url) !== index))];

duplicateUrls.forEach((url) => errors.push(`duplicate sitemap URL: ${url}`));

const requiredTopicHubs = [
  'alternatives',
  'knowledge-management',
  'open-source-engineering',
  'private-ai',
  'product-updates',
  'project-management',
  'self-hosting',
];

requiredTopicHubs.forEach((slug) => {
  const url = `${SITE_URL}/blog/${slug}`;

  if (!urlSet.has(url)) errors.push(`missing topic hub from sitemap: ${url}`);
});

['/downloaded', '/invitation/expired'].forEach((pathname) => {
  const url = `${SITE_URL}${pathname}`;

  if (urlSet.has(url)) errors.push(`non-indexable utility page appears in sitemap: ${url}`);
});

const posts = fs
  .readdirSync(postsDirectory)
  .filter((fileName) => fileName.endsWith('.mdx'))
  .map((fileName) => {
    const { data } = matter(fs.readFileSync(path.join(postsDirectory, fileName), 'utf8'));
    const [, , , ...slugParts] = fileName.replace(/\.mdx$/, '').split('-');
    const slug = slugParts.join('-');
    const url = `${SITE_URL}/blog/${slug}`;
    const shouldBeIndexed = !data.unpublished && !data.archived;

    if (shouldBeIndexed && !urlSet.has(url)) {
      errors.push(`published article missing from sitemap: ${url}`);
    }

    if (!shouldBeIndexed && urlSet.has(url)) {
      errors.push(`unpublished or archived article appears in sitemap: ${url}`);
    }

    if (shouldBeIndexed) {
      const expectedLastmod = new Date(data.last_modified || data.date).toISOString();
      const actualLastmod = sitemapEntries.get(url)?.lastmod;

      if (actualLastmod !== expectedLastmod) {
        errors.push(`article sitemap lastmod is stale: ${url} (expected ${expectedLastmod}, found ${actualLastmod})`);
      }
    }

    return {
      fileName,
      slug,
      legacySlug: fileName.replace(/\.mdx$/, ''),
      date: data.date,
      pinned: Number(data.pinned) || 0,
      shouldBeIndexed,
      related: Array.isArray(data.related) ? data.related : [],
    };
  });

const postsByReference = new Map(
  posts.flatMap((post) => [
    [post.slug, post],
    [post.legacySlug, post],
  ])
);

posts
  .filter((post) => post.shouldBeIndexed)
  .forEach((post) => {
    post.related.forEach((reference) => {
      const relatedPost = postsByReference.get(reference);

      if (!relatedPost) {
        errors.push(`${post.fileName}: related article does not exist: ${reference}`);
      } else if (!relatedPost.shouldBeIndexed) {
        errors.push(`${post.fileName}: related article is not indexable: ${reference}`);
      }
    });
  });

const publishedPosts = posts
  .filter((post) => post.shouldBeIndexed)
  .sort((first, second) => new Date(second.date).getTime() - new Date(first.date).getTime());
const featuredPost = publishedPosts
  .filter((post) => post.pinned > 0)
  .sort((first, second) => first.pinned - second.pinned)[0];
const archiveCount = publishedPosts.length - (featuredPost || publishedPosts[0] ? 1 : 0);
const expectedBlogPages = Math.max(1, Math.ceil(archiveCount / BLOG_PAGE_SIZE));

for (let page = 2; page <= expectedBlogPages; page += 1) {
  const url = `${SITE_URL}/blog/page/${page}`;

  if (!urlSet.has(url)) errors.push(`missing paginated blog archive from sitemap: ${url}`);
}

urls
  .filter((url) => url.startsWith(`${SITE_URL}/blog/page/`))
  .forEach((url) => {
    const page = Number(url.split('/').pop());

    if (!Number.isInteger(page) || page < 2 || page > expectedBlogPages) {
      errors.push(`unexpected paginated blog URL in sitemap: ${url}`);
    }
  });

fs.readdirSync(postsDirectory)
  .filter((fileName) => fileName.endsWith('.mdx'))
  .forEach((fileName) => {
    const source = fs.readFileSync(path.join(postsDirectory, fileName), 'utf8');
    const { data } = matter(source);

    if (data.unpublished || data.archived) return;

    for (const match of source.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)) {
      const rawTarget = match[1].trim().replace(/^<|>$/g, '');
      let targetUrl;

      try {
        targetUrl = new URL(rawTarget, SITE_URL);
      } catch {
        continue;
      }

      if (targetUrl.origin !== SITE_URL || !targetUrl.pathname.startsWith('/blog/')) continue;

      const normalizedUrl = `${SITE_URL}${targetUrl.pathname.replace(/\/$/, '')}`;

      if (!urlSet.has(normalizedUrl)) {
        errors.push(`${fileName}: internal blog link does not target an indexable canonical URL: ${rawTarget}`);
      }
    }
  });

if (/<(?:changefreq|priority)>/.test(sitemap)) {
  errors.push('sitemap includes ignored changefreq or priority hints; publish trustworthy lastmod values instead');
}

const contextualLinkSources = ['lib/blog-topics.ts', 'app/compare/components/hero-apps.tsx'];

contextualLinkSources.forEach((source) => {
  const contents = fs.readFileSync(path.join(process.cwd(), source), 'utf8');

  for (const match of contents.matchAll(/href:\s*['"](\/[^'"]+)['"]/g)) {
    const normalizedPath = match[1] === '/' ? '/' : match[1].replace(/\/$/, '');
    const url = `${SITE_URL}${normalizedPath}`;

    if (!urlSet.has(url)) errors.push(`${source}: contextual link target is missing from sitemap: ${match[1]}`);
  }
});

const robots = fs.readFileSync(robotsPath, 'utf8');

if (!robots.includes(`Sitemap: ${SITE_URL}/sitemap.xml`)) {
  errors.push('robots.txt does not advertise the production sitemap');
}

if (errors.length) {
  console.error(`SEO publishing validation failed with ${errors.length} issue(s):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exitCode = 1;
} else {
  console.log(`SEO publishing validation passed for ${urls.length} sitemap URLs.`);
}
