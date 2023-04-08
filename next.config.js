module.exports = {
    webpack: (config) => { 
      config.resolve.preferRelative = true
      return config
    },

    i18n: {
      locales: ['en', 'fr', 'ja', 'da', 'de', 'es', 'ru', 'ko', 'it', 'ar'],
      defaultLocale: 'en',
    },
}
