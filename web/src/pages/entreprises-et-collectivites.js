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


export const pageQuery = graphql`
  query PagePro {
    index: allSanityPages(filter: {name: {eq: "Entreprises & Collectivités"}}) {
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
  une: allSanityPros(filter: {une: {eq: true}}) {
    nodes {
      titre
      txtune {
        _rawTexteune(resolveReferences: {maxDepth: 10})
        _rawImg(resolveReferences: {maxDepth: 10})
      }
    }
  }
}
`



  const PagePro = (data) => {
    const source = data.data.index.nodes[0]
    const une = data.data.une.nodes[0]
    return (
      <Layout>
        <Hero hero={source} />
        <Pro une={une} />
        <section data-element="trait"></section>
        <Tabs />    
        <Contact />
      </Layout>
    )
  }


export const Head = () => <Seo title="Entreprises" />

export default PagePro

