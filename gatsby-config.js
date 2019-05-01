const autoprefixer = require("autoprefixer");
const browserslist = require("browserslist");
const cssnano = require("cssnano");

module.exports = {
    pathPrefix: "/r6-operatoricons",
    plugins: [
        `gatsby-plugin-typescript`,
        "gatsby-plugin-resolve-src",
        "gatsby-plugin-svg-sprite",
        "gatsby-plugin-react-helmet",
        {
            resolve: `gatsby-plugin-sass`,
            options: {
                includePaths: ["src/scss"],
                postCssPlugins: [autoprefixer({ browsers: browserslist() }), cssnano({ preset: "default" })],
                precision: 5
            }
        },
        {
            resolve: `gatsby-plugin-google-analytics`,
            options: {
              trackingId: "UA-38249052-3",
              anonymize: true,
              head: true,
              respectDNT: true,
              cookieDomain: "marcopixel.eu",
            }
        }
    ]
};
