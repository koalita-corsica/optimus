import * as React from "react"
import {PortableText} from '@portabletext/react'
import {components} from '../utils/textcomponents'
import { Link } from "gatsby"
import SanityImage from "gatsby-plugin-sanity-image"
  
import * as hero from './hero.module.scss'

const CustomImage = ({ yourImageFieldData, alt} ) => {
    return (
      <SanityImage {...yourImageFieldData} data-img  alt={alt}></SanityImage>
    )
  }

const Hero = (props) => {
    const hero = props.hero
    const isHome = hero.name === "Accueil" ? true : false
    console.log(hero)

  return (
    <section data-section="hero" data-page={hero.name}>
      <div data-content>
        <h1>{hero.titre}</h1>
        <div><PortableText value={hero._rawIntro} components={components} /></div>
        <Link to="#">{hero.boutonun}</Link>
        {isHome ? <Link to="#">{hero.boutondeux}</Link> : <h2>Pas hero</h2>}
      </div>
      <CustomImage yourImageFieldData={hero.img} alt={hero._rawImg.alt} />
    </section>
  )
}

export default Hero
