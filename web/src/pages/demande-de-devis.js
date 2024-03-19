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


export const pageQuery = graphql`
  query ContacterAgex {
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
      secdeuxtun
      secdeuxtdeux
      _rawEquipe(resolveReferences: {maxDepth: 10})
      _rawIdmarque(resolveReferences: {maxDepth: 10})
    }
  }
  identite: allSanityIdentite(sort: {ordre: ASC}) {
    nodes {
      ordre
      name
      _rawIdtext(resolveReferences: {maxDepth: 10})
    }
  }
  equipe: allSanityEquipe(sort: {ordre: ASC}) {
    nodes {
      _rawPortrait(resolveReferences: {maxDepth: 10})
    }
  }
}
`



  const ContacterAgex = (data) => {
    const source = data.data.index.nodes[0]
    const identite = Array.from(data.data.identite.nodes)
    const equipe = Array.from(data.data.equipe.nodes)
    return (
      <Layout>
        <Hero hero={source} />
        <section data-section="À propos" id="informations">
          <section data-content="Équipe">
            <h3>{source.secdeuxtun}</h3>
            <h3>{source.secdeuxtdeux}</h3>
            <div>
              {equipe.map((membre, i) => 
                    <img src={membre._rawPortrait.asset.url} alt={membre._rawPortrait.alt} key={i + 29873 * 1897} />
              )}
            </div>
          </section>
          <section data-content="Identité de marque">
            {identite.map((id, i) => 
              <div key={i + 8873 * 2063} data-content="Principe">
                <h4><span>0{id.ordre}</span> {id.name}</h4>
                <div>
                  <PortableText value={id._rawIdtext} components={components} />
                </div>
              </div>
            )}
          </section>
        </section>
        <Contact />
      </Layout>
    )
  }


export const Head = () => <Seo title="Accueil" />

export default ContacterAgex

