import * as React from "react"
import {PortableText} from '@portabletext/react'
import {components} from '../utils/textcomponents'
import { Link } from "gatsby"
import SanityImage from "gatsby-plugin-sanity-image"
import {ArrowLineDown} from "@phosphor-icons/react"
  
import {titrus, image, intro, boutons, more, arrow, linkmore} from './hero.module.scss'

const CustomImage = ({ yourImageFieldData, alt} ) => {
    return (
      <SanityImage {...yourImageFieldData} data-img className={image} alt={alt}></SanityImage>
    )
  }

const Hero = (props) => {
    const hero = props.hero
    const isHome = hero.name === "Accueil" ? true : false
    const arrows = <div data-more>
                    <Link to="#" className={linkmore}><h3 className={more}>Pour en savoir plus à propose d'<span>Agex BE</span></h3>
                    <ArrowLineDown size={45} color="#3D3D3D" weight="duotone" className={arrow} /></Link>
                  </div>
  return (
    <section data-section="hero" data-page={hero.name}>
      <div data-content>
        <h1 className={titrus}>{hero.titre}</h1>
        <div className={intro}><PortableText value={hero._rawIntro} components={components} /></div>
        <div className={boutons}>
          <Link to="#" data-boutonshero="gauche">{hero.buttonun}</Link>
          {isHome ? <Link data-boutonshero="droite" to="#">{hero.buttondeux}</Link> : null}
        </div>
        {isHome ? arrows : null}
      </div>
      <CustomImage yourImageFieldData={hero.img} alt={hero._rawImg.alt} />
    </section>
  )
}

export default Hero
