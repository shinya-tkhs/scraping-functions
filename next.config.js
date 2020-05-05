module.exports = {
  webpack: config => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty'
    }
    return config
  },
}

// const withTypescript = require("@zeit/next-typescript")

// module.exports = withTypescript()
// const DotEnv = require('dotenv-webpack')
// const { PHASE_DEVELOPMENT_SERVER } = require("next/constants")
// const env = {
//   FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
//   FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
//   FIREBASE_DATABASE_URL: process.env.FIREBASE_DATABASE_URL,
//   FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
//   FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
//   FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
//   MEASUREMENT_ID: process.env.MEASUREMENT_ID,
//   FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
//   FB_PUBLIC_VAPID_KEY: process.env.FB_PUBLIC_VAPID_KEY,
// }

// module.exports =  {
//   // env,
//   webpack: config => {
//     // Fixes npm packages that depend on `fs` module
//     config.node = {
//       fs: 'empty'
//     }
//     return config
//   },
//   // target: 'serverless',
//   // pageExtentions: ['mdx', 'jsx', 'js', 'ts', 'tsx'],
//   // publicRuntimeConfig: {
//   //   staticFolder: '/static'
//   // },
//   // poweredByHeader: false,
//   // generateEtags: false,
//   // generateBuildId: async () => {
//   //   return 'my-sample-build-id'
//   // },
//   // onDemandEntries: {
//   //   maxInactiveAge: 25 * 1000,
//   //   pageBufferLength: 2,
//   // },
//   // typescript: {
//   //   ignoreDevErrors: false,
//   // },
//   // exportPathMap: async function(
//   //   defaultPathMap,
//   //   { dev, dir, outDir, distDir, buildId }
//   // ) {
//   //   return {
//   //     '/': { page: '/'},
//   //   }
//   // },
//   // webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
//   //   config.plugins.push(new DotEnv({ silent: true }))
//   //   return config
//   // }
// }