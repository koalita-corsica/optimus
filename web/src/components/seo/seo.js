/**
 * SEO component that queries for data with
 * Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
const Seo = ({ description, title }) => {

  const metaDescription = description || "Un duo d’experts au service de la digitalisation de votre communication pour vous faire connaître et attirer de nouveaux clients."
  const siteTitle = title || "Koalità accompagne les entreprises dans leur croissance sur internet"

  return (
    <>
      <title>{siteTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
    </>
  )
}

export default Seo
