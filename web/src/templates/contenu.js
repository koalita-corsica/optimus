import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout/layout"
import Seo from "../components/seo/seo"


import { PortableText } from "@portabletext/react"
import { components } from "../components/utils/textcomponents"
import Carrousel from "../components/carrousel/carrousel"
import Informations from "../components/informations/informations"
import Resume from "../components/resume/resume"


export const pageQuery = graphql`
   query($id: String!) {
    contenu: sanityPages(_id: {eq: $id}) {
        name
        _rawIntro(resolveReferences: {maxDepth: 10})
        _rawImg(resolveReferences: {maxDepth: 10})
        tag
        _rawP1(resolveReferences: {maxDepth: 10})
        _rawP2(resolveReferences: {maxDepth: 10})
        informations {
          display
          _rawInformations(resolveReferences: {maxDepth: 10})
          _rawModalites(resolveReferences: {maxDepth: 10})
          _rawObjpedago(resolveReferences: {maxDepth: 10})
          _rawProgramme(resolveReferences: {maxDepth: 10})
        }
        enresume {
          display
          _rawImg(resolveReferences: {maxDepth: 10})
          _rawTexte(resolveReferences: {maxDepth: 10})
      }
  }
}
`


  const Contenu = (data) => {

    const contenu = data.data.contenu
    const tag = contenu.tag || "Contenu"
    const firstp = contenu._rawP1 || false
    const secondp = contenu._rawP2 || false
    const informations = contenu.informations.display ? contenu.informations._rawInformations : false
    const resume = contenu.enresume?.display ? contenu.enresume : false || false

    return (
      <Layout>
        <main data-page="contenu">
          <section data-hero>
            <div data-imgtag>
                <button className="item">{tag}</button>
                <img src={contenu._rawImg?.asset.url} alt={contenu._rawImg?.alt} />
            </div>
            <div data-intro>
                <h1>{contenu.name}</h1>
                <PortableText value={contenu._rawIntro} components={components} />
            </div>
          </section>
          <section data-pagecontent>
            {firstp && <div data-maincontent="1"><PortableText components={components} value={firstp} /></div>}
            {secondp && <div data-maincontent="2"><PortableText components={components} value={secondp} /></div>}
          </section>
          {informations && <Informations infos={informations} />}
          {resume && <Resume resume={resume} />}
          <Carrousel />
        </main>
      </Layout>
    )
  }


export const Head = () => <Seo title="Accueil" />

export default Contenu