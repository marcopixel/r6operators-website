/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable unicorn/filename-case */
const cssnano = require("cssnano");

module.exports = {
  siteMetadata: {
    siteName: `r6operators`,
    siteUrl: `https://marcopixel.eu/r6operators/`,
    title: `r6operators - Rainbow Six: Siege operator icons`,
    description: `r6operators is a collection of high-quality vectorized Rainbow Six: Siege Operator icons & metadata for Node.js`,
    keywords: `rainbow six siege, rainbow6, ubisoft, operator, icons, node`,
    author: `Marco Vockner <marcopixel@live.de>`,
    authorTwitter: `@marcopixel`
  },
  pathPrefix: "/r6operators",
  plugins: [
    `gatsby-plugin-typescript`,
    `gatsby-plugin-tsconfig-paths`,
    "gatsby-plugin-svg-sprite",
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        includePaths: ["src/scss"],
        postCssPlugins: [cssnano({ preset: "default" })],
        precision: 5
      }
    }
  ]
};
