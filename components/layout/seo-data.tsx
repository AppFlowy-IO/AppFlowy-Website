import React from 'react';

function SeoData() {
  const data = typeof window === 'undefined' ? {} : {};

  return <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export default SeoData;
