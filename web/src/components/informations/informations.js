import * as React from "react"
import './informations.module.scss'
import { PortableText } from "@portabletext/react"
import { components } from "../utils/textcomponents"
import {BookOpen, Info, Scroll, Target} from '@phosphor-icons/react'


const Informations = (infos) => {

    const informations = infos.infos


    const [activeIndex, setActiveIndex] = React.useState(0)
    const handleDisplayClick = (index) => {
      setActiveIndex(index)
    }
  
    return (
      <section data-informations="composant">
        <section data-informations="contenu">
          <nav data-informations="display">
            <ul>
              <li
                className={activeIndex === 0 ? "item-bold" : "item" }
                onClick={() => handleDisplayClick(0)}
              >
                <Info weight="duotone" className="icone" size={22} />Informations
              </li>
              <li
                className={activeIndex === 1 ? "item-bold" : "item" }
                onClick={() => handleDisplayClick(1)}
              >
                <Target weight="duotone" className="icone" size={22} />Objectifs pédagogiques
              </li>
              <li
                className={activeIndex === 2 ? "item-bold" : "item" }
                onClick={() => handleDisplayClick(2)}
              >
                <BookOpen weight="duotone" className="icone" size={22} />Programme
              </li>
              <li
                className={activeIndex === 3 ? "item-bold" : "item" }
                onClick={() => handleDisplayClick(3)}
              >
                <Scroll weight="duotone" className="icone" size={22} />Modalités
              </li>
            </ul>
          </nav>
          <section data-informations="displayed">
            <div style={{ display: activeIndex === 0 ? 'block' : 'none' }}>
              <PortableText components={components} value={informations._rawInformations} />
            </div>
            <div style={{ display: activeIndex === 1 ? 'block' : 'none' }}>
              <PortableText components={components} value={informations._rawObjpedago} />
            </div>
            <div style={{ display: activeIndex === 2 ? 'block' : 'none' }}>
              <PortableText components={components} value={informations._rawProgramme} />
            </div>
            <div style={{ display: activeIndex === 3 ? 'block' : 'none' }}>
              <PortableText components={components} value={informations._rawModalites} />
            </div>
          </section>
        </section>
      </section>
    )
  }
  
  export default Informations