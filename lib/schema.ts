const site_url = process.env.NEXT_PUBLIC_SITE_BASE_URL!;

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
 * path given must resolve to a real page — there is no `/compare` index, for example,
 * so comparison pages sit directly under Home.
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
