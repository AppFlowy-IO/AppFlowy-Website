const path = require('path');

try {
  require('./env.js');
} catch (e) {
  console.log('Error loading .env file');
}

const isProd = process.env.NODE_ENV === 'production';
const environment = process.env.ENVIRONMENT || 'development';

let assetPrefix = undefined;
if (isProd) {
  if (environment === 'production') {
    assetPrefix = 'https://appflowy.io';
  } else if (environment === 'test') {
    assetPrefix = 'https://test.appflowy.io';
  }
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
      source: '/product',
      destination: '/',
    },
    {
      source: '/v2/pricing',
      destination: '/',
    },
  ];
};
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

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
  },
  async headers() {
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

module.exports = nextConfig;
