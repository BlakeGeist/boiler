module.exports = {
    async rewrites() {
      return [
        {
          source: "/sitemap.xml",
          destination: "https://us-central1-legos-1ab16.cloudfunctions.net/serveSitemap"
        }
      ]
    },
    webpack: (config) => { 
      config.resolve.preferRelative = true
      return config
    },
    i18n: {
      locales: ['en', 'fr', 'ja', 'da', 'de', 'es', 'ru', 'ko', 'it', 'ar'],
      defaultLocale: 'en',
    },
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'firebasestorage.googleapis.com',
          port: '',
          pathname: '/v0/b/legos-1ab16.appspot.com/o/**',
        },
      ],
    }
}
