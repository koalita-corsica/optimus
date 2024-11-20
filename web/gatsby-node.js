/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;  

  const intermediaire = graphql(`
  query Intermediaire {
      intermediaire: allSanityPages(filter: {inter: {pageinter: {eq: true}}}) {
        nodes {
            name
            _id
            slug {
                current
            }
            menu {
                slug {
                    current
                }
            }
        }
    }
  }
`).then(result => {
  result.data.intermediaire.nodes.forEach((item) => {
    const slug = item.menu.slug.current + "/" + item.slug.current
    const id = item._id
    createPage({
      path: slug,
      component: require.resolve(`./src/templates/intermediaire.js`),
      context: { id: id },
    })
  })
})


const contenu = graphql(`
  query Contenu {
        contenu: allSanityPages(filter: {inter: {pageinter: {eq: false}}}) {
            nodes {
                name
                _id
                slug {
                    current
                }
                menu {
                    slug {
                        current
                    }
                }
                inter {
                    pageparente {
                        slug {
                        current
                        }
                    }
                }
            }
        }
    }
`).then(result => {
  result.data.contenu.nodes.forEach((item) => {
    const slug = item.menu.slug.current + "/" +  item.inter.pageparente.slug.current + "/" + item.slug.current
    const id = item._id
    createPage({
      path: slug,
      component: require.resolve(`./src/templates/contenu.js`),
      context: { id: id },
    })
  })
})

const formation = graphql(`
  query Formation {
        formation: allSanityFormations {
            nodes {
                name
                _id
                slug {
                    current
                }
            }
        }
    }
`).then(result => {
  result.data.formation.nodes.forEach((item) => {
    const slug = "/" + item.slug.current
    const id = item._id
    createPage({
      path: slug,
      component: require.resolve(`./src/templates/formation.js`),
      context: { id: id },
    })
  })
})

  return Promise.all([intermediaire, contenu, formation])
}
