import * as React from "react"
import { Link, useStaticQuery, graphql  } from "gatsby"
import {Phone, At, MagnifyingGlass, GraduationCap, Student, Exam, DotsThreeCircle, List, X} from "@phosphor-icons/react"  
import {headerus, liste, croixus, annexes} from './header.module.scss'
import Logo from '../../images/logos/optimus-logo.png'
import Arrow from '../../images/elements/fleche.svg'

const Header = () => {
  const data = useStaticQuery(graphql`
    query HeaderQuery {
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
            menu {
              slug {
                current
              }
          }
          }
        }
        }
      }
    }
  `)
  
  const menu = data.allSanityMenu.nodes
  
  function toggleMenu() {
    const cross = document.querySelector('[data-icone="croix"]')
    const liste = document.querySelector('[data-icone="liste"]')
    const menu = document.querySelector('nav')
    if (cross.style.display === "none") {
     cross.style.display = "block";
     liste.style.display = "none";
     menu.style.display = "flex";
    }
    else {
     cross.style.display = "none";
     liste.style.display = "block";
     menu.style.display = "none";
    }
   }

   const [activeIndex, setActiveIndex] = React.useState(0)
   const handleItemSelect = (index) => {
    setActiveIndex(index)
  }

return (
  <header className={headerus}>
    <nav data-topheader>
      <section data-coordonees>
        <a href="tel:06.73.53.74.00"><Phone size={16} color="#218771" weight="duotone" /> <span className="item-bold">06.73.53.74.00</span></a>
        <a href="mailto:contact@optimus-fac.com"><At size={16} color="#218771" weight="duotone" /> <span className="item-bold">contact@optimus-fac.com</span></a>
      </section>
      <section data-search>
        <Link to="/formations" className="item-bold"><MagnifyingGlass size={16} color="#218771" weight="duotone" /> Trouver un formation</Link>
      </section>
      <section data-contact>
        <Link to="./contact" className="item-bold">Découvrir & contacter Optimus</Link>
      </section>
    </nav>
    <Link to="/" data-logo>
      <img src={Logo} alt="Le logo d'Optimus FAC" />
    </Link>
    <nav data-mainmenu>
      <ul data-items>
        <div data-arrow>
          <img src={Arrow} alt="Arrow" />
        </div>
        {menu.map((item, index) => (
          <li
            key={item.name}
            data-item={index === activeIndex ? 'active' : 'inactive'}
          onMouseEnter={() => handleItemSelect(index)} 
          onClick={() => handleItemSelect(index)}
          >
            <a href="#">{item.name}</a>
          </li>
        ))}
      </ul>
      <ul data-subitems>
        {menu[activeIndex]?.subitems.map((page, i) => (
          <li key={page.name} data-subitem>            
            <Link to={page.menu ? `/${menu[activeIndex]?.slug.current}/${page.slug?.current}` : `/${page.slug?.current}`}>{page.name}</Link>
            {(menu[activeIndex]?.subitems.length != i + 1) && <span data-separator>||</span>}
          </li>
        ))}
      </ul>
    </nav>
    {/* <div data-icones>
      <List size={32} className={liste} onClick={toggleMenu} data-icone="liste" />
      <X size={32} className={croixus} onClick={toggleMenu} data-icone="croix" />
    </div> */}
  </header>
)
}
export default Header
