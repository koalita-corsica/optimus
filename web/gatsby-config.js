/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import('gatsby').GatsbyConfig}
 */

const siteUrl = process.env.URL || `https://optimus-fac.com`

module.exports = {
  siteMetadata: {
    title: `Optimus`,
    description: `Optimus by Koalità`,
    author: `@_jiann`,
    siteUrl: `https://optimusfac.com`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        excludes: ["/**/404", "/**/404.html"],
        createLinkInHead: true,
        query: `
        {
          allSitePage {
            nodes {
              path
            }
          }
        }
        `,
        resolveSiteUrl: () => siteUrl,
        resolvePages: ({
          allSitePage: {nodes: allPages},
        }) => {
          return allPages.map(page => {
            return { ...page }
          })
        }
      }
    },
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Optimus`,
        short_name: `opt`,
        start_url: `/`,
        background_color: `#663399`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/example.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: "gatsby-source-sanity",
      options: {
        projectId: "01xufuk5",
        dataset: "production",
      },
    },
    {
      resolve: "gatsby-plugin-sanity-image",
      options: {
        projectId: "01xufuk5",
        dataset: "production",
      },
    },
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        implementation: require("sass"),
        additionalData: `@use "${__dirname}/src/styles/variables" as var;`
      }
    },
  ],
}
