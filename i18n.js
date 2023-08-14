module.exports = {
  locales: ['default', 'en-US', 'zh-CN', 'fr', 'zh-TW'],
  defaultLocale: 'default',
  defaultNS: 'common',
  localeDetection: false,
  pages: {
    '*': ['common'],
    '/[lang]': ['home'],
    '/[lang]/what-is-new': ['what-is-new'],
    '/[lang]/download': ['download'],
    '/[lang]/about-us': ['about-us'],
    '/[lang]/career': ['career'],
    '/[lang]/contact-us': ['contact-us'],
    '/[lang]/blocks': ['blocks'],
    '/[lang]/contributors': ['contributors'],
  },
  loadLocaleFrom: async (locale, ns) => import(`/locales/${locale}/${ns}.json`).then((r) => r.default),
};
