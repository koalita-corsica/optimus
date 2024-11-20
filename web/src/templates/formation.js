import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout/layout"
import Seo from "../components/seo/seo"

import { PortableText } from "@portabletext/react"
import { components } from "../components/utils/textcomponents"
import Carrousel from "../components/carrousel/carrousel"
import Informations from "../components/informations/informations"


export const pageQuery = graphql`
   query($id: String!) {
    formation: sanityFormations(_id: {eq: $id}) {
        name
        _rawIntro(resolveReferences: {maxDepth: 10})
        _rawImg(resolveReferences: {maxDepth: 10})
        tag
        informations {
          display
          _rawInformations(resolveReferences: {maxDepth: 10})
          _rawModalites(resolveReferences: {maxDepth: 10})
          _rawObjpedago(resolveReferences: {maxDepth: 10})
          _rawProgramme(resolveReferences: {maxDepth: 10})
        }
        metadatas {
        thematiques {
          titre
        }
      }
      brochure {
        asset {
          url
        }
      }
  }
}
`


  const Formation = (data) => {

    const formation = data.data.formation
    const tag = formation.tag || formation.metadatas.thematiques[0].titre || "Formation"
    const informations = formation.informations.display ? formation.informations : false
    
    console.log("formation", informations)

    return (
      <Layout>
        <main data-page="formation">
          <section data-hero>
            <div data-imgtag>
                <button className="item">{tag}</button>
                <img src={formation._rawImg?.asset.url} alt={formation._rawImg?.alt} />
            </div>
            <div data-intro>
                <h1>{formation.name}</h1>
                <PortableText value={formation._rawIntro} components={components} />
            </div>
          </section>
          {formation.brochure && <a href={formation.brochure.asset.url} target="_blank" data-download>Télécharger la brochure</a>}
          {informations && <Informations infos={informations} />}
          <Carrousel />
        </main>
      </Layout>
    )
  }


export const Head = () => <Seo title="Accueil" />

export default Formation