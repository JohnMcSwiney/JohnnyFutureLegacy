

/** @type {import('next').NextConfig} */
const nextConfig = {
    /* config options here */
    async headers() {
        return [
          {
              source: '/',
              headers: [
                  {
                    "key": "Content-Security-Policy",
                    "value": "default-src 'self' https: ; script-src 'self' ; object-src 'none'"
                  }
              ]
          }
        ]
      }
  }
  

  module.exports = nextConfig
