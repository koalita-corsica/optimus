import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout/layout"
import Seo from "../components/seo/seo"
import Hero from "../components/hero/hero"

import '../styles/index.module.scss'

import SanityImage from "gatsby-plugin-sanity-image"
import { PortableText } from "@portabletext/react"
import { components } from "../components/utils/textcomponents"
import Contact from "../components/contact/contact"
import Pro from "../components/activites/pro"
import Tabs from "../components/activites/tabs"
import Particuliers from "../components/activites/particuliers"


export const pageQuery = graphql`
  query PagePro {
    index: allSanityPages(filter: {name: {eq: "Particuliers"}}) {
    nodes {
      name
      titre
      buttonun
      buttondeux
      _rawPlus(resolveReferences: {maxDepth: 10})
      _rawIntro(resolveReferences: {maxDepth: 10})
      _rawImg(resolveReferences: {maxDepth: 10})
      img {
        ...ImageWithPreview
      }
    }
  }
  part:allSanityParticuliers(sort: {ordre: ASC}) {
    nodes {
      ordre
      titre
      stitre
      _rawImage(resolveReferences: {maxDepth: 10})
      _rawParagraphe(resolveReferences: {maxDepth: 10})
    }
  }
}
`



  const PageParticuliers = (data) => {
    const source = data.data.index.nodes[0]
    const infoPart = data.data.part
    return (
      <Layout>
        <Hero hero={source} />
        <Particuliers  infos={infoPart} />
        <Contact />
      </Layout>
    )
  }


export const Head = () => <Seo title="Entreprises" />

export default PageParticuliers

