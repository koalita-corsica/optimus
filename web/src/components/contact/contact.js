import * as React from "react"
import SanityImage from "gatsby-plugin-sanity-image"
import {Phone, Envelope} from "@phosphor-icons/react"
import { useStaticQuery, graphql } from "gatsby"
  
import {fondus, contactus, nomus} from  './contact.module.scss'

const CustomImage = ({ yourImageFieldData, alt} ) => {
    return (
      <SanityImage {...yourImageFieldData} data-img  alt={alt}></SanityImage>
    )
  }


const Contact = () => {
    const infosContact = useStaticQuery(graphql`
        query infosContact {
            allSanityPages(filter: {name: {eq: "Contact"}}) {
                nodes {
                tel
                mail
                _rawImgfond(resolveReferences: {maxDepth: 10})
                }
            }
        }
    `) 
    const contact = infosContact.allSanityPages.nodes[0]
  return (
    <section data-content="Formulaire de contact">
        <img src={contact._rawImgfond.asset?.url} alt={contact._rawImgfond.alt} className={fondus} />
        <section data-section="Contact">
            <div data-infos="Contact">
                <div data-infos="Détails des contact">
                    <h3>Nous contacter</h3>
                    <div className={contactus}>
                        <Phone size={32} color="#d64c4c" /> <p>{contact.tel}</p>
                    </div>
                    <div className={contactus}>
                        <Envelope size={32} color="#d64c4c" /> <p>{contact.mail}</p>
                    </div>
                </div>
            </div>
            <form action="https://getform.io/f/ebf0bbaf-ab65-4726-90bf-90f2f44cb67d" method="POST">
                <div className={nomus}>
                    <label>
                        <p>Nom</p>   
                        <input type="text" autoComplete="on" required name="nom" />
                    </label>
                    <label>
                        <p>Prénom</p>   
                        <input type="text" autoComplete="on" required name="Préom" />
                    </label>
                </div>
                <label>
                    <p>Email</p>   
                    <input type="email" autoComplete="on" required name="email" />
                </label>
                <label>
                    <p>Message</p>   
                    <textarea name="message" required />
                </label>
                <input type="hidden" name="_gotcha" style={{display:'none !important'}} />
                <button type="submit" className="cta" data-submit>Contactez-nous</button>
            </form>
        </section>
    </section>
  )
}

export default Contact
