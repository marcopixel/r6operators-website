/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable unicorn/filename-case */
const cssnano = require("cssnano");

module.exports = {
  siteMetadata: {
    siteName: `Using TypeScript Example`,
    exampleUrl: `https://github.com/gatsbyjs/gatsby/tree/master/examples/using-typescript`
  },
  plugins: [
    `gatsby-plugin-typescript`,
    `gatsby-plugin-tsconfig-paths`,
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        includePaths: ["src/scss"],
        postCssPlugins: [cssnano({ preset: "default" })]
      }
    }
  ]
};
