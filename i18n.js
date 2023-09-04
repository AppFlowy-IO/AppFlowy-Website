module.exports = {
  locales: ['en'],
  defaultLocale: 'en',
  defaultNS: 'common',
  localeDetection: false,
  pages: {
    '*': ['common'],
    '/': ['home'],
    '/what-is-new': ['what-is-new'],
    '/download': ['download'],
    '/about-us': ['about-us'],
    '/career': ['career'],
    '/contact-us': ['contact-us'],
    '/blocks': ['blocks'],
    '/contributors': ['contributors'],
  },
  loadLocaleFrom: async (locale, ns) => import(`/locales/${locale}/${ns}.json`).then((r) => r.default),
};
