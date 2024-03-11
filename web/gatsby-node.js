/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
// Ci dessous un exemple fonctionnel
// exports.createPages = ({ graphql, actions }) => {
//   const { createPage } = actions;  

//   const article = graphql(`
//   query Article {
//       articles: allSanityBlog {
//         nodes {
//           _id
//           slug {
//               current
//           }
//         }
//       }
//     }
// `).then(result => {
//   result.data.articles.nodes.forEach((item) => {
//     const slug = "blog/" + item.slug.current
//     const id = item._id
//     createPage({
//       path: slug,
//       component: require.resolve(`./src/templates/article.js`),
//       context: { id: id },
//     })
//   })
// })


// const client = graphql(`
//   query Client {
//       clients: allSanityPartenaires {
//         nodes {
//           _id
//           name
//         }
//       }
//     }
// `).then(result => {
//   result.data.clients.nodes.forEach((item) => {
//     const url = item.name.normalize("NFD")
//     .replace(/[\u0300-\u036f]/g, '')
//     .replace(/[^a-zA-Z0-9]/g, ' ')
//     .replace(/\s+/g, '-')
//     .replace(/-+$/, '')
//     .slice(0, 200)
//     .toLowerCase()
//     const slug = "realisations/" + url
//     const id = item._id
//     createPage({
//       path: slug,
//       component: require.resolve(`./src/templates/client.js`),
//       context: { id: id },
//     })
//   })
// })

//   return Promise.all([article, client])
// }