// const config = {
//   auto: {
//     threshold: 0.1,
//     skip: [],
//     rsc: false,
//   },
//   experimental: {
//     hmr: true,
//   },
// }

// export default config

const config = {
  auto: {
    threshold: 0.1,
    skip: [
      /^Rds[A-Z].*/, // Skip all Rds* components from Million.js optimization
    ],
    rsc: false,
  },
  experimental: {
    hmr: true,
  },
}
 
export default config
