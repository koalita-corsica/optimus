import * as React from "react"
import { Link, useStaticQuery, graphql  } from "gatsby"
import {footerus} from './footer.module.scss'
import Logo from '../../images/logos/optimus-logo.png'


const Footer = () => {
  const data = useStaticQuery(graphql`
    query FooterQuery {
      allSanityMenu {
        nodes {
          name
          slug {
            current
          }
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
  
   const menu = data.allSanityMenu.nodes

return (
  <footer className={footerus}>
    <section data-footermenu>
        <img src={Logo} alt="Logo Optimus FAC (fond blanc)" />   
        <nav>
            {menu.map((item, i) => 
            <div data-ms key={item.name + i * 28}>
                <Link to={"/" + item.slug.current} className="item-bold">{item.name}</Link>
                    <ul>
                        {item.subitems.map((page) => 
                            <li key={page.name}><Link to={"/" + item.slug.current + "/" + page.slug?.current} className="item">{page.name}</Link></li>
                        )}
                    </ul>
            </div>
            )}
        </nav>
    </section>
    <section data-secondlinks>
        <div><Link to="" className="item">Mentions légales</Link><span> &nbsp;||&nbsp; </span><Link className="item" to="">Plan du site</Link></div>
        <div><span className="item">(c) Optimus Fac - Tous droits réservés</span></div>
    </section>
  </footer>
)
}
export default Footer
