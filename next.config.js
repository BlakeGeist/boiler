


  /**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    "rewrites": [{
        "source": "/:path*",
        "has": [
            {
                "type": "host",
                "value": ":pet-tips-n-tricks.com"
            }
        ],
        "destination": "/sites/pet-tips-n-tricks.com/:path*"
    }]
  }
  
  module.exports = nextConfig