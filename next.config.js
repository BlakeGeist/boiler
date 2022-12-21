


  /**
 * @type {import('next').NextConfig}
 */
  module.exports = {
    async rewrites() {
      return [
        // if the header `x-rewrite-me` is present,
        // this rewrite will be applied
        {
          source: '/:path*',
          has: [
            {
              type: 'host',
              key: 'pet-tips-n-tricks.com',
            },
          ],
          destination: "/sites/pet-tips-n-tricks.com/:path*"
        }
      ]
    }
}

  