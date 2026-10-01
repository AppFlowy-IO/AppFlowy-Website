const baseUrl = (process.env.SEO_AUDIT_BASE_URL || process.argv[2] || 'https://appflowy.com').replace(/\/$/, '');
const routes = ['/', '/blog', '/blog/project-management', '/blog/best-clickup-alternatives'];
const errors = [];

function getAttribute(tag, name) {
  return tag.match(new RegExp(`\\s${name}=["']([^"']+)["']`, 'i'))?.[1];
}

function normalizeUrl(value) {
  const url = new URL(value);

  if (url.pathname !== '/') url.pathname = url.pathname.replace(/\/$/, '');

  return url.toString();
}

async function checkRoute(pathname) {
  const requestedUrl = `${baseUrl}${pathname}`;
  const response = await fetch(requestedUrl, {
    headers: {
      'User-Agent': 'AppFlowySEOHealthCheck/1.0',
    },
    redirect: 'follow',
  });

  if (!response.ok) {
    errors.push(`${pathname}: expected 2xx, received ${response.status}`);
    return;
  }

  const html = await response.text();
  const robotsTag = html.match(/<meta\b[^>]*\bname=["']robots["'][^>]*>/i)?.[0];
  const robotsContent = robotsTag ? getAttribute(robotsTag, 'content') : '';

  if (/\bnoindex\b/i.test(robotsContent || '')) {
    errors.push(`${pathname}: production HTML contains noindex`);
  }

  const canonicalTag = html.match(/<link\b(?=[^>]*\brel=["']canonical["'])[^>]*>/i)?.[0];
  const canonical = canonicalTag ? getAttribute(canonicalTag, 'href') : undefined;
  const expectedCanonical = normalizeUrl(requestedUrl);

  if (!canonical) {
    errors.push(`${pathname}: canonical link is missing`);
  } else if (normalizeUrl(new URL(canonical, baseUrl).toString()) !== expectedCanonical) {
    errors.push(`${pathname}: canonical is ${canonical}, expected ${expectedCanonical}`);
  }

  if (pathname === '/blog' && !html.includes('href="/blog/page/2"')) {
    errors.push('/blog: crawlable pagination link to page 2 is missing from server HTML');
  }

  if (pathname === '/blog/best-clickup-alternatives') {
    if (!/<article\b/i.test(html)) errors.push(`${pathname}: article element is missing from server HTML`);
    if (!/<img\b/i.test(html)) errors.push(`${pathname}: article image is missing from server HTML`);
  }
}

async function main() {
  await Promise.all(routes.map(checkRoute));

  if (errors.length) {
    console.error(`Production SEO health check failed for ${baseUrl}:`);
    errors.forEach((error) => console.error(`- ${error}`));
    process.exitCode = 1;
    return;
  }

  console.log(`Production SEO health check passed for ${routes.length} routes on ${baseUrl}.`);
}

main().catch((error) => {
  console.error(`Production SEO health check could not run: ${error.message}`);
  process.exitCode = 1;
});
