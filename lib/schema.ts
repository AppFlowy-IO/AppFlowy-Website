const site_url = process.env.NEXT_PUBLIC_SITE_BASE_URL || 'https://appflowy.com';

export interface Crumb {
  /** Short label for this position in the trail, e.g. 'Blog'. */
  name: string;
  /** Site-root-relative path, e.g. '/blog'. */
  path: string;
}

/**
 * Builds a BreadcrumbList node for a page's `@graph`.
 *
 * 'Home' is prepended automatically, so callers pass only the trail below it. Every
 * path given must resolve to a real page. There is no `/compare` index, so comparison
 * pages use the crawlable `/blog/alternatives` hub in their trail.
 */
export function generateBreadcrumbSchema(crumbs: Crumb[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Home', path: '/' }, ...crumbs].map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `${site_url}${crumb.path === '/' ? '' : crumb.path}`,
    })),
  };
}
