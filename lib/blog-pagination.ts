export const BLOG_PAGE_SIZE = 12;

export function getBlogPageHref(page: number) {
  return page <= 1 ? '/blog' : `/blog/page/${page}`;
}
