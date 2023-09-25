const path = require('path');
const isProd = process.env.NODE_ENV === 'production';
const environment = process.env.ENVIRONMENT || 'development';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  // Use the CDN in production and localhost for development.
  assetPrefix: isProd ? `https://d3uafhn8yrvdfn.cloudfront.net/website/${environment}` : undefined,
};

module.exports = nextConfig;
