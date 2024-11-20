import * as React from "react"
import './resume.module.scss'
import { PortableText } from "@portabletext/react"
import { components } from "../utils/textcomponents"



const Resume = (data) => {

  const enResume = data.resume 

   
    return (
      <section data-resume="composant">
        <section data-resume="contenu">
            <div data-resume="texte">
                <h2>En résumé</h2>
                <PortableText value={enResume._rawTexte} components={components} />
            </div>
            <img src={enResume._rawImg.asset.url} alt={enResume._rawImg.alt} />
        </section>
      </section>
    )
  }
  
  export default Resume