import * as React from "react"
  
import { PortableText } from "@portabletext/react"
import { components } from "../utils/textcomponents"

import {unePro} from './activite.module.scss'


const Pro = (une) => {
    const activite = une.une
    const texte = activite.txtune._rawTexteune
  return (
    <section data-content="Activité à la une" className={unePro}>
        <div data-details="une">
            <img src={activite.txtune._rawImg[0].asset.url} alt={activite.txtune._rawImg[0].alt} />
            <section data-contenu>
                <h2>{activite.titre}</h2>
                <PortableText value={texte} components={components} />
            </section>
        </div>
    </section>
  )
}

export default Pro
