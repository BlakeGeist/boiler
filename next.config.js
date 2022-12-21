


  /**
 * @type {import('next').NextConfig}
 */
  module.exports = {
    async rewrites() {
      return [
        {
            source: '/:path*',
            has: [
                {
                type: 'host',
                value: 'pet-tips-n-tricks.com',
                },
            ],
            destination: 'https://pet-tips-n-tricks.com/sites/pet-tips-n-tricks.com/:path*/',
        }
      ]
    }
}

  