import * as React from "react"
  
import { PortableText } from "@portabletext/react"
import { components } from "../utils/textcomponents"

import {partus} from './activite.module.scss'


const Particuliers = (data) => {
    const partinfos = data.infos.nodes
    console.log(partinfos)
  return (
    <section data-content="Activités pour particuliers" className={partus}>
        {partinfos.map((combi, i) => 
        <div data-details="Activité pour particulier" data-ordre={i % 2 === 0 ? "pair" : "impair"} key={i + 876 *123}>
          <img src={combi._rawImage.asset.url} alt={combi._rawImage.alt} />
          <section data-contenu="portable text" >
              <h2>{combi.titre}</h2>
              <div><PortableText value={combi._rawParagraphe} components={components} /></div>
          </section>
        </div>
        )}   
    </section>
  )
}

export default Particuliers