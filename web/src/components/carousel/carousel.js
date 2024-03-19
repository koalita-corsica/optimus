import * as React from "react"
import {PortableText} from '@portabletext/react'
import {components} from '../utils/textcomponents'
import { Link } from "gatsby"
import SanityImage from "gatsby-plugin-sanity-image"
import {ArrowLineDown} from "@phosphor-icons/react"
  
import * as carou from './carousel.module.scss'

const CustomImage = ({ yourImageFieldData, alt} ) => {
    return (
      <SanityImage {...yourImageFieldData} data-img  alt={alt}></SanityImage>
    )
  }

const Carousel = (props) => {
    const hero = props.hero
    const isHome = hero.name === "Accueil" ? true : false
    const arrows = <>
                        <Link to="#">{hero.buttondeux}</Link>
                        <div data-more>
                          Pour en savoir plus à propose d'<u>Agex BE</u>
                          <ArrowLineDown size={32} color="#d64c4c" weight="duotone" />
                        </div>
                      </>

  return (
    <section data-section="hero" data-page={hero.name}>
      <div data-content>
        <h1>{hero.titre}</h1>
        <div><PortableText value={hero._rawIntro} components={components} /></div>
        <Link to="#">{hero.buttonun}</Link>
        {isHome ? arrows : null}
      </div>
      <CustomImage yourImageFieldData={hero.img} alt={hero._rawImg.alt} />
    </section>
  )
}

export default Carousel
