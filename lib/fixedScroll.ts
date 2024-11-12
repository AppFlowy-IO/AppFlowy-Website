export function fixSidebarOnScroll({
  sidebar,
  container,
  headerHeight,
  gap,
  enebaleScroll = true,
}: {
  sidebar: HTMLElement;
  container: HTMLElement;
  headerHeight: number;
  gap: number;
  enebaleScroll?: boolean;
}) {
  const containerRect = container.getBoundingClientRect();
  const sidebarRect = sidebar.getBoundingClientRect();
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

  const containerTop = containerRect.top + scrollTop;
  const containerBottom = containerRect.bottom + scrollTop;
  const sidebarHeight = sidebarRect.height;

  const maxTop = containerBottom - sidebarHeight - headerHeight - gap;
  const maxBottom = containerBottom - sidebarHeight - scrollTop;

  if (scrollTop + headerHeight + gap > containerTop) {
    if (scrollTop + headerHeight + gap < maxTop) {
      sidebar.style.position = 'fixed';
      sidebar.style.top = `${headerHeight + gap}px`;
    } else {
      sidebar.style.position = 'fixed';

      sidebar.style.top = `${Math.min(headerHeight + gap, maxBottom)}px`;
    }
  } else {
    sidebar.style.position = 'relative';
    sidebar.style.top = 'initial';

    if (enebaleScroll) {
      if (sidebarHeight + gap + headerHeight > window.innerHeight) {
        container.classList.add('scroll-enabled');
        sidebar.style.height = `${window.innerHeight - headerHeight - gap}px`;
        sidebar.style.overflowY = 'auto';
      }
    }

  }
}