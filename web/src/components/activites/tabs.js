import * as React from "react"
import SanityImage from "gatsby-plugin-sanity-image"
import {Phone, Envelope} from "@phosphor-icons/react"
import { useStaticQuery, graphql } from "gatsby"
  
import {tabus} from  './activite.module.scss'
import { PortableText } from "@portabletext/react"
import { components } from "../utils/textcomponents"



const Tabs = () => {
    const tabsInfos = useStaticQuery(graphql`
        query tabs {
            tabs: allSanityPros(filter: {une: {eq: false}}, sort: {ordre: ASC}) {
                nodes {
                    titre
                    _rawContenuTemplate(resolveReferences: {maxDepth: 10})
                    _rawTempGal(resolveReferences: {maxDepth: 10})
                    _rawTempQuinconce(resolveReferences: {maxDepth: 10})
                    ordre
                    genre
                }
            }
        }
    `) 
    const tabs = tabsInfos.tabs.nodes

    const displaycontent = (e) => {
        // Récupérer l'attribut de données "ordre" de l'élément "mission"
        // Parcourir tous les éléments déclenchés pour trouver celui avec le même ordre
        const triggered = document.querySelectorAll('[role="tab"]')
        const triggers = document.querySelectorAll('[role="tabpanel"]') 
        const ordreMission = e.currentTarget.dataset.ordre
        triggered.forEach(t => {
        if (t.dataset.ordre === ordreMission) {
            // Afficher l'élément correspondant à l'ordre
            t.setAttribute('aria-selected', 'true')
        } else {
            // Masquer tous les autres éléments déclenchés
            t.setAttribute('aria-selected', 'false')
        }
        });
        triggers.forEach(tr => {
            if (tr.dataset.ordre === ordreMission) {
                tr.style.display = "block"
            } else {
                tr.style.display = "none"
            }
            });
    }

  return (
    <section data-content="Tabs" className={tabus}>
        <nav data-tabchoice="tabchoice">
            <ul role="tablist" >
                {tabs.map((tab, i) => 
                    <li role="tab" aria-selected={tab.ordre === 1 ? "true" : "false"} aria-controls={"panel-" + tab.ordre} id={"tab-" + tab.ordre} tabIndex={i} key={i + 2893 * 98767} data-ordre={i} onClick={displaycontent} onKeyDown={displaycontent} >
                    {tab.titre}
                </li>
                )}
            </ul>
        </nav>
        <section data-tabchoice="Contenu">
        {tabs.map((tab, i) => 
            <div id={"panel-" + tab.ordre} role="tabpanel" tabIndex={i} aria-labelledby={"tab-" + tab.ordre} data-tabchoice={"Détails - " + tab.genre} data-ordre={i} key={i + 293 * 98767}>
                <h3>{tab.titre}</h3>
                {(() => {
                    switch (tab.genre) {
                    case "text":   return <PortableText value={tab._rawContenuTemplate} components={components} />;
                    case "gal": return <>
                        <PortableText value={tab._rawTempGal.pCombi} components={components} />
                        <section data-contenu="galerie" data-long={tab._rawTempGal.galerieimgcombi.img.length}>{tab._rawTempGal.galerieimgcombi.img.map((img, i) => <img src={img.asset.url} alt={img.alt} key={i + 283 * 12} /> )}</section>
                    </>;
                    case "quinconce":  return <>
                        {tab._rawTempQuinconce.map((combi, i) => 
                            <section data-contenu="quinconce" data-ordre={i % 2 === 0 ? "pair" : "impair"} key={i + 876 *123}>
                                <div><PortableText value={combi.pCombi} components={components} /></div>
                                <img src={combi.imgCombi.asset.url} alt={combi.imgCombi.alt} />
                            </section>
                        )}    
                    </>;
                    default:      return <p>Aucun contenu n'a été trouvé pour ce service. Merci de revenir consulter cette page ulterieurement</p>;
                    }
                })()}
            </div>
        )}
        </section>
    </section>
  )
}

export default Tabs
