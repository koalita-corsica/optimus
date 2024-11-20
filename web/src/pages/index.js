import * as React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout/layout"
import Seo from "../components/seo/seo"

import {HandWaving, ListStar, ChatsCircle, ArrowCircleRight} from "@phosphor-icons/react"


import { PortableText } from "@portabletext/react"
import { components } from "../components/utils/textcomponents"
import Carrousel from "../components/carrousel/carrousel"


export const pageQuery = graphql`
  query IndexPage {
    index: sanityPages(name: {eq: "Accueil"}) {
    name
    _rawImg(resolveReferences: {maxDepth: 10})
    _rawIntro(resolveReferences: {maxDepth: 10})
    _rawUne(resolveReferences: {maxDepth: 10})
  }
}
`


  const IndexPage = (data) => {

    const index = data.data.index
    return (
      <Layout>
        <main data-page="accueil">
          <section data-hero>
            <img src={index._rawImg.asset.url} alt={index._rawImg.alt} />
            <div data-bandeau>
              <ChatsCircle weight="duotone" size={65} data-icone />
              <span>Votre partenaire formation</span>
            </div>
            <nav data-herolink>
              <Link to="/formations" className="item-bold">Nos formations <ArrowCircleRight size={30} /></Link>
            </nav>
          </section>
          <section data-pagecontent>
            <div data-intro>
              <PortableText value={index._rawIntro} components={components} />
              <Link to="/developper-mes-competences/decouvrir-optimus/">Découvrir Optimus</Link>
            </div>
          </section>
          <section data-une>
            <h1><ListStar size={45} weight="duotone" data-icone />Articles à la une</h1>
            <div data-unecontent>
              <Link to ={index._rawUne.slug.current}>
                <img src={index._rawUne.img.asset.url} alt={index._rawUne.img.alt} />
                <h2>{index._rawUne.name}</h2>
                <div>
                  <PortableText components={components} value={index._rawUne.shortdesc} />
                </div>
                <button>Lire l'article</button>
              </Link>
            </div>
          </section>
          <Carrousel />
        </main>
      </Layout>
    )
  }


export const Head = () => <Seo title="Accueil" />

export default IndexPage

