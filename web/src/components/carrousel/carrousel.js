import * as React from "react"
import { Link, useStaticQuery, graphql  } from "gatsby"
import './carrousel.module.scss'
import Fleche from "../../images/elements/fl2.svg"
import FlecheBas from "../../images/elements/flcb.png"
import { PortableText } from "@portabletext/react"
import { components } from "../utils/textcomponents"
import { ChatsCircle } from "@phosphor-icons/react"
import Img from "../../images/imageportrait.png"

const Carrousel = ({ children }) => {

    const carr = useStaticQuery(graphql`
        query Carrousel {
            allSanityMenu {
                nodes {
                    name
                    slug {
                        current
                    }
                    _rawTexte(resolveReferences: {maxDepth: 10})
                    _rawImage(resolveReferences: {maxDepth: 10})
                    subitems {
                        ... on SanityFormations {
                            name
                            slug {
                                current
                            }
                        }
                        ... on SanityPages {
                            name
                            slug {
                                current
                            }
                        }
                    }
                }
            }
        }
      `)
    const carou = carr.allSanityMenu.nodes

    // Affichage de la card
    const [activeSlug, setActiveSlug] = React.useState(carou[0]?.slug.current || "")
    const handleNavClick = (slug) => {
        setActiveSlug(slug)
    }
    // Dernier mot en gras
    const formatLastWordBold = (text) => {
        const words = text.split(" ");
        if (words.length === 1) return <span>{text}</span>;
        const lastWord = words.pop();
        return (
          <>
            {words.join(" ")} <span style={{ fontWeight: 900 }}><br />{lastWord}</span>
          </>
        );
      };

  return (
    <section data-carrousel="composant">
        <div data-carrousel="navigation">
            {carou.map((carou) => 
                <nav data-display={carou.slug.current} data-active={carou.slug.current === activeSlug} key={carou.name} onClick={() => handleNavClick(carou.slug.current)}>
                    <h4 data-last>{formatLastWordBold(carou.name)}</h4>
                    <img src={carou._rawImage?.asset.url} alt={carou.name} />
                </nav>
            )}
        </div>
        <div data-carrousel="contenu">
            {carou.map((carou, i) => 
                <div key={carou.name + "227"} data-displayed={carou.slug.current} style={{ display: carou.slug.current === activeSlug ? 'flex' : 'none' }}>
                    <img src={Fleche} data-carrousel="fleche" />
                    <div data-titreimg>
                        <h3 data-last>{formatLastWordBold(carou.name)}</h3>
                        <img src={carou._rawImage?.asset.url} alt={carou.name} />
                    </div>
                    <div data-details>
                        <PortableText components={components} value={carou._rawTexte} />
                        <nav data-mininav>
                            <ul>
                                {carou.subitems.map((item, i) => 
                                    <li className="item" key={item.slug.current + item.name + i * 2203}><Link to={item.slug.current}>{item.name}</Link></li>
                                )}
                            </ul>
                        </nav>
                    </div>
                    <img src={Img} alt="#" data-illus />
                </div>
            )}
        </div>
        <div data-carrousel="flbas">
            <img src={FlecheBas} alt="" />
        </div>
        <div data-carrousel="contact">
            <section>
                <h2><ChatsCircle weight="duotone" size={54} data-icone />Contacter Optimus</h2>
                <form>
                    <div className="form-group">
                    <label htmlFor="nom"><h5>Votre nom</h5></label>
                    <input type="text" id="nom" name="nom" placeholder="Nom" />
                    
                    <label htmlFor="prenom"><h5>Votre prénom</h5></label>
                    <input type="text" id="prenom" name="prenom" placeholder="Prénom" />
                    </div>
                    
                    <div className="form-group">
                    <label htmlFor="email"><h5>Votre adresse email</h5></label>
                    <input type="email" id="email" name="email" placeholder="Email" />
                    </div>
                    
                    <div className="form-group">
                    <label htmlFor="telephone"><h5>Votre numéro de téléphone</h5></label>
                    <input type="tel" id="telephone" name="telephone" placeholder="Téléphone" />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="message"><h5>Votre message</h5></label>
                        <textarea id="message" name="message" placeholder="Message"></textarea>
                    </div>
                    
                    <button type="submit">ENVOYER</button>
                </form>
            </section>
        </div>
    </section>
  )
}

export default Carrousel
