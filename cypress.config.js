// eslint-disable-next-line @typescript-eslint/no-var-requires
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
  },
  viewportWidth: 1400,
  viewportHeight: 800,
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },
});
