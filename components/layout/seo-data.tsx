import React from 'react';

interface SeoDataProps {
  /** A JSON-LD object (typically an `@graph`) to embed in the document. */
  data: Record<string, unknown>;
  /** Optional id, useful when a page renders more than one block. */
  id?: string;
}

/**
 * Renders JSON-LD as a plain inert `<script>` rather than via `next/script`.
 *
 * `application/ld+json` is not an executable script type, so the browser never parses
 * or runs it — there is no main-thread cost to embedding it directly. Going through
 * `next/script` instead makes the block a client component, so it only reaches the DOM
 * after hydration and is absent from the server HTML that non-rendering crawlers read.
 */
function SeoData({ data, id }: SeoDataProps) {
  // `<` is escaped so a `</script>` sequence inside any string value (e.g. a post's
  // articleBody) cannot terminate the tag early. < is valid JSON, so consumers
  // still parse the original character.
  const json = JSON.stringify(data).replace(/</g, '\\u003c');

  return (
    <script
      id={id}
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}

export default SeoData;
