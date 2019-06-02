const autoprefixer = require("autoprefixer");
const browserslist = require("browserslist");
const cssnano = require("cssnano");

module.exports = {
    siteMetadata: {
        siteName: `r6-operatoricons`,
        siteUrl: `https://marcopixel.eu/r6-operatoricons/`,
        title: `r6-operatoricons - Rainbow Six: Siege operator icons`,
        description: `r6-operatoricons is a collection of Rainbow Six: Siege operator icons avaliable in SVG, PNG and AI. Each icon is made by hand in Adobe Illustrator and might have slight differences.`,
        keywords: `rainbow six siege, rainbow6, ubisoft, operator, icons`,
        author: `marcopixel <marcopixel@live.de>`,
        authorTwitter: `@marcopixel`,

    },
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
        }
    ]
};
