import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const path = require('path');
const __dirname = path.dirname(new URL(import.meta.url).pathname);

import remarkGfm from 'remark-gfm';

const withMDX = require('@next/mdx')({
  transpilePackages: ['next-mdx-remote'],
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
    // This is required for `MDXProvider` component
    providerImportSource: '@mdx-js/react',
  },
});

try {
  require('./env.js');
} catch (e) {
  console.log('Error loading .env file');
}

const isProd = process.env.NODE_ENV === 'production';

let assetPrefix = undefined;

if (isProd) {
  assetPrefix = process.env.NEXT_PUBLIC_SITE_BASE_URL;
}

const securityHeaders = [
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
];
const rewrites = () => {
  return [
    {
      source: '/privacy/app',
      destination: '/privacy',
    },
    {
      source: '/terms/app',
      destination: '/terms',
    },
    {
      source: '/crm/v3/:path*',
      destination: 'https://api.hubapi.com/crm/v3/:path*',
    },
    {
      source: '/downloading',
      destination: '/downloaded',
    },
    {
      source: '/whatsnew',
      destination: '/what-is-new',
    },
    {
      source: '/blocks',
      destination: '/appflowy-blocks',
    },
    {
      source: '/careers',
      destination: '/join',
    },
    {
      source: '/blog',
      destination: '/subscribe-newsletter',
    },
    {
      source: '/privacy/mobile',
      destination: '/privacy/app',
    },
    {
      source: '/template-center',
      destination: '/templates',
    },
    {
      source: '/template-center/:path*',
      destination: '/templates/:path*',
    },
    {
      source: '/compare',
      destination: '/compare/notion-vs-appflowy',
    },
  ];
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },

  // Use the CDN in production and localhost for development.
  assetPrefix,
  rewrites,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    minimumCacheTTL: 60 * 60 * 24 * 7,
    unoptimized: true,
  },
  async headers () {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/(.*)',
        headers: securityHeaders,
      },
      {
        source: '/:all*(docx)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate, proxy-revalidate',
          },
          {
            key: 'Pragma',
            value: 'no-cache',
          },
          {
            key: 'Expires',
            value: '0',
          },
        ],
      },
    ];
  },
};

export default withMDX(nextConfig);
