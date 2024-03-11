import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout/layout"
import Seo from "../components/seo/seo"
import Hero from "../components/hero/hero"

import * as indexStyle from '../styles/index.module.scss'

import SanityImage from "gatsby-plugin-sanity-image"


export const pageQuery = graphql`
  query IndexPage {
    index: allSanityPages(filter: {name: {eq: "Accueil"}}) {
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
}
`



  const IndexPage = (data) => {
    const source = data.data.index.nodes[0]
    return (
      <Layout>
        <h1 className={indexStyle.titre}>Hello</h1>
        <Hero hero={source} />
      </Layout>
    )
  }


export const Head = () => <Seo title="Home" />

export default IndexPage

