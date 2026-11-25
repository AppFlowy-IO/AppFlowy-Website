const fs = require('fs');
const path = require('path');
const { readRegistry } = require('./template-slug-registry');

/**
 * Production smoke check: every template URL we have ever published still lands on a page.
 *
 * The build-time checks prove the registry was never trimmed; this proves the deployed site
 * honours it. It requests:
 *   - every /templates/* URL in public/sitemap.xml — must be a 200 with a self canonical;
 *   - every registered slug and alias — must reach a 200, and a sitemap-listed template
 *     slug must render a template rather than a category that took its URL;
 *   - every legacy /templates/<category>/<view_id> URL — must 308 to the registered slug;
 *   - every /templates/ link in a published blog post — must reach a 200.
 *
 * It runs in the nightly production workflow without `npm install`, so it sticks to
 * Node built-ins.
 */
const baseUrl = (process.env.SEO_AUDIT_BASE_URL || process.argv[2] || 'https://appflowy.com').replace(/\/$/, '');
const SITE_HOSTS = new Set(['appflowy.com', 'www.appflowy.com', 'appflowy.io', 'www.appflowy.io']);
const MAX_REDIRECTS = 3;
const CONCURRENCY = 8;
const errors = [];

const sitemapPaths = () => {
  const sitemap = fs.readFileSync(path.join(process.cwd(), 'public', 'sitemap.xml'), 'utf8');

  return [...sitemap.matchAll(/<loc[^>]*>([\s\S]*?)<\/loc\s*>/g)]
    .map((match) => new URL(match[1].trim()).pathname)
    .filter((pathname) => pathname.startsWith('/templates/'));
};

const blogTemplateLinks = () => {
  const postsDirectory = path.join(process.cwd(), '_blog');

  return fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith('.mdx'))
    .flatMap((fileName) => {
      const source = fs.readFileSync(path.join(postsDirectory, fileName), 'utf8');
      const frontmatter = source.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] || '';

      if (/^(?:unpublished|archived):\s*true\s*$/m.test(frontmatter)) return [];

      return [...source.matchAll(/\]\(([^)\s]+)\)/g)].flatMap((match) => {
        let url;

        try {
          url = new URL(match[1], 'https://appflowy.com');
        } catch {
          return [];
        }

        return SITE_HOSTS.has(url.hostname) && url.pathname.startsWith('/templates/')
          ? [{ pathname: url.pathname.replace(/\/$/, ''), source: fileName }]
          : [];
      });
    });
};

/** One request, retried once on a network error or 5xx so a blip does not page anyone. */
async function request(url) {
  for (let attempt = 0; ; attempt += 1) {
    try {
      const response = await fetch(url, {
        headers: { 'User-Agent': 'AppFlowySEOHealthCheck/1.0' },
        redirect: 'manual',
        signal: AbortSignal.timeout(30000),
      });

      if (response.status < 500 || attempt > 0) return response;
    } catch (error) {
      if (attempt > 0) throw error;
    }
  }
}

/** Follows redirects by hand so each hop's status is visible. */
async function resolve(pathname) {
  const hops = [];
  let url = `${baseUrl}${pathname}`;

  for (;;) {
    const response = await request(url);
    const location = response.headers.get('location');

    hops.push({ status: response.status, pathname: new URL(url).pathname });

    if (response.status < 300 || response.status >= 400 || !location) {
      return { hops, response, html: response.status === 200 ? await response.text() : '' };
    }

    if (hops.length > MAX_REDIRECTS) return { hops, response, html: '' };

    url = new URL(location, url).toString();
  }
}

const describe = (hops) => hops.map(({ status, pathname }) => `${status} ${pathname}`).join(' -> ');

const canonicalPath = (html) => {
  const tag = html.match(/<link\b(?=[^>]*\brel=["']canonical["'])[^>]*>/i)?.[0];
  const href = tag?.match(/\shref=["']([^"']+)["']/i)?.[1];

  return href ? new URL(href, baseUrl).pathname.replace(/(.)\/$/, '$1') : undefined;
};

const isTemplatePage = (html) => /"@type"\s*:\s*"CreativeWork"/.test(html);

async function check({ pathname, label, expect }) {
  let result;

  try {
    result = await resolve(pathname);
  } catch (error) {
    errors.push(`${label} ${pathname}: request failed (${error.message})`);
    return;
  }

  const { hops, html } = result;
  const final = hops[hops.length - 1];
  const fail = (reason) => errors.push(`${label} ${pathname}: ${reason} [${describe(hops)}]`);

  if (final.status !== 200) return fail('does not land on a 200');

  if (expect.direct && hops.length > 1) return fail('redirects, but the sitemap must list final URLs');

  if (expect.direct && canonicalPath(html) !== pathname) return fail(`canonical is ${canonicalPath(html)}`);

  if (expect.template && !isTemplatePage(html)) return fail('renders, but not as a template page');

  if (expect.permanentTo) {
    if (hops[0].status !== 308) return fail('expected a 308');
    if (hops[1]?.pathname !== expect.permanentTo) return fail(`expected to redirect to ${expect.permanentTo}`);
  }
}

async function main() {
  const registry = readRegistry();
  const sitemap = sitemapPaths();
  const listed = new Set(sitemap);
  const checks = new Map();
  const add = (pathname, label, expect = {}) => {
    if (!checks.has(pathname)) checks.set(pathname, { pathname, label, expect });
  };

  Object.entries(registry).forEach(([viewId, entry]) => {
    const slugPath = `/templates/${entry.slug}`;

    // Listed in the sitemap means live, so it has to be the template itself.
    add(slugPath, 'registered slug', listed.has(slugPath) ? { direct: true, template: true } : {});
    (entry.aliases || []).forEach((alias) => add(`/templates/${alias}`, 'registered alias'));
    // The legacy route ignores the category segment for a registered id, so one prefix stands in for all.
    add(`/templates/${entry.fallbackCategory || 'templates'}/${viewId}`, 'legacy URL', { permanentTo: slugPath });
  });
  sitemap.forEach((pathname) => add(pathname, 'sitemap URL', { direct: true }));
  blogTemplateLinks().forEach(({ pathname, source }) => add(pathname, `${source} link`));

  const queue = [...checks.values()];

  await Promise.all(
    Array.from({ length: CONCURRENCY }, async () => {
      while (queue.length) await check(queue.shift());
    })
  );

  if (errors.length) {
    console.error(`Template URL check failed for ${baseUrl} (${errors.length} of ${checks.size} URLs):`);
    errors.sort().forEach((error) => console.error(`- ${error}`));
    process.exitCode = 1;
    return;
  }

  console.log(`Template URL check passed for ${checks.size} URLs on ${baseUrl}.`);
}

main().catch((error) => {
  console.error(`Template URL check could not run: ${error.message}`);
  process.exitCode = 1;
});
