module.exports = {
  locales: ['en'],
  defaultLocale: 'en',
  defaultNS: 'common',
  localeDetection: false,
  pages: {
    '*': ["common"],
  },
  loadLocaleFrom: async (locale, namespace) =>
      import(`/locales/${locale}.json`).then((r) => r.default),
}