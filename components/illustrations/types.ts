export interface IllustrationProps {
  className?: string;
  // Marks the illustration's main image as the page's LCP candidate:
  // preloaded with fetchpriority="high" instead of lazy loaded.
  priority?: boolean;
}
