const autoprefixer = require('autoprefixer');
const browserslist = require('browserslist');

module.exports = {
  pathPrefix: "/r6-operatoricons",
  siteMetadata: {
    siteName: `Using Typescript Example`,
  },
  plugins: [
    `gatsby-plugin-typescript`,
    'gatsby-plugin-resolve-src',
    'gatsby-plugin-svg-sprite',
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        includePaths: ["src/scss"],
        postCssPlugins: [autoprefixer({ browsers: browserslist() })],
        precision: 5,
      },
    },
  ],
}
