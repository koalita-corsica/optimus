import * as React from "react"
import { Link } from "gatsby"
import {List, X} from "@phosphor-icons/react"
  
import {headerus, liste, croixus, annexes} from './header.module.scss'

const Header = () => {
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

return (
  <header className={headerus}>
    <Link to="/" >
      <img src="" alt="Le logo d'Agex BE" />
    </Link>
    <nav>
      <ul>
        <li><Link to="./">Accueil</Link></li>
        <li><Link to="/entreprises-et-collectivites">Entreprises & collectivités</Link></li>
        <li><Link to="/particuliers">Particuliers</Link></li>
        <li><Link to="">Réalisations</Link></li>
        <li><Link to="/contact">Nous contacter</Link></li>
        <li><Link to="/demande-de-devis">Prendre rendez-vous</Link></li>
      </ul>
      <div className={annexes}>
        <Link to="#">Mentions légales</Link>
        <Link to="#">Plan du site</Link>
      </div>
    </nav>
    <div data-icones>
      <List size={32} className={liste} onClick={toggleMenu} data-icone="liste" />
      <X size={32} className={croixus} onClick={toggleMenu} data-icone="croix" />
    </div>
  </header>
)
}
export default Header
