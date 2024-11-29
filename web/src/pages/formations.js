import React, { useState, useEffect } from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout/layout"
import Seo from "../components/seo/seo"
import { PortableText } from "@portabletext/react"
import { components } from "../components/utils/textcomponents"
import Fld from "../images/elements/fld.svg"
import { CheckSquareOffset, Square, Binoculars, Handshake, CalendarSlash, Certificate, ArrowCircleRight } from "@phosphor-icons/react"


export const pageQuery = graphql`
  query allFormations {
    formations: allSanityFormations {
        nodes {
            name
            metadatas {
                thematiques {
                titre
                }
                _rawDesc(resolveReferences: {maxDepth: 10})
                jm {
                jours
                mois
                }
                niveau
                rythmelieu
                heures
            }
            slug {
                current
            }
        }
    }
    thematiques: allSanityThematiques {
        nodes {
        titre
        }
    }
}
`


  const FormationsPage = (data) => {

    const allFormations = data.data.formations.nodes
    const allThematiques = data.data.thematiques.nodes
    const [formationsFiltres, setFormationsFiltres] = useState(allFormations)
    console.log("formations", [allFormations, allThematiques])

    const [themes, setThemes] = useState({})
    const [rythmelieu, setRythmelieu] = useState({})
    useEffect(() => {
      // thèmes
      const newThemes = allThematiques.reduce((acc, theme) => {
        acc[theme.titre] = true;
        return acc;
      }, {})
      
      // Rythme & lieux
      const allRythmelieu = [...new Set(allFormations.map((item) => item.metadatas.rythmelieu).flat())]
      const rythmelieuObject = Object.fromEntries(allRythmelieu.map((value) => [value, true]));

      setRythmelieu(rythmelieuObject);
      setThemes(newThemes)
    }, [allThematiques, allFormations]);

    const [levels, setLevels] = useState({
      qualifiante: true,
      niveau3: true,
      niveau4: true,
      niveau6: true,
      niveau5: true,
      niveau7: true
    });
  

    const filtrage = () => {
      const cards = document.querySelectorAll('[data-card]');
      console.log("cards", cards)
      cards.forEach(card => {
        const formationName = card.querySelector('h5').textContent;
        const formation = allFormations.find(f => f.name === formationName);
        if (!formation) return;
        
        const thematiquesMatch = Object.entries(themes).some(
          ([key, value]) => value && formation.metadatas.thematiques.some(t => t.titre === key)
        );
        
        const rythmelieuMatch = Object.entries(rythmelieu).some(
          ([key, value]) => value && formation.metadatas.rythmelieu.includes(key)
        );
        
        const niveauMatch = Object.entries(levels).some(
          ([key, value]) => value && key === formation.metadatas.niveau
        );
        
        const isFiltered = thematiquesMatch && rythmelieuMatch && niveauMatch;
        console.log("niveauuuu", [formation.metadatas.niveau, Object.entries(levels)])
        console.log("is it tho?", [thematiquesMatch,rythmelieuMatch, niveauMatch, isFiltered])
        card.dataset.isfiltered = isFiltered;
      });
    };
    
    const handleCheckboxChange = (group, option) => {
      switch (group) {
        case 'themes':
          setThemes(prev => {
            const updatedThemes = { ...prev, [option]: !prev[option] };
            return updatedThemes;
          });
          break;
    
        case 'rythmelieu':
          setRythmelieu(prev => {
            const updatedRythmelieu = { ...prev, [option]: !prev[option] };
            return updatedRythmelieu;
          });
          break;
    
        case 'levels':
          setLevels(prev => {
            const updatedLevels = { ...prev, [option]: !prev[option] };
            return updatedLevels;
          });
          break;
    
        default:
          break;
      }
    
      // Appel de la fonction de filtrage après mise à jour des états
      setTimeout(filtrage, 0);
    };
  
    // Fonction pour réinitialiser tous les filtres
    const resetFilters = () => {
      setLevels({
        qualifiante: true,
        niveau3: true,
        niveau4: true,
        niveau6: true,
        niveau5: true,
        niveau7: true
      });
    };

    const correctDiploma = (nom) => {
      switch (nom) {
        case 'qualif':
          return "Formation qualifiante"
        case 'nv1':
          return "Diplôme de niveau 1"
        case 'nv2':
          return "Diplôme de niveau 2"
        case 'nv3':
          return "Diplôme de niveau 3"
        case 'nv4':
          return "Diplôme de niveau 4"
        case 'nv5':
          return "Diplôme de niveau 5"
        case 'nv6':
          return "Diplôme de niveau 5"
        case 'nv7':
          return "Diplôme de niveau 7"
        case null: 
          return "Niveau de diplôme non précisé"
        default:
          return nom
      }
    };

    return (
      <Layout>
        <main data-page="formations">
          <section data-recherche>
          <h1><img src={Fld} alf="" />Nos formations</h1>
          <section data-filtresu>
            <aside data-aside="aside-filter">
            <div data-aside="filter-header">
                <h3><Binoculars weight="duotone" data-icone size={48} data-aside="filter-icon" />Recherche</h3>
                <button data-aside="reset-button" onClick={resetFilters}>RÉINITIALISER LA RECHERCHE</button>
            </div>

            <div data-aside="filter-section">
                <h4>Thématiques</h4>
                <div data-aside="tags">
                    {Object.entries(themes).map(([key, value]) => (
                      <button data-aside="tag" key={key} data-label={value} onClick={() => handleCheckboxChange('themes', key)}>{key}</button>
                    ))}
                </div>
            </div>

            <div data-aside="filter-section">
                <h4>Rythme & lieu</h4>
                <div data-aside="checkbox-group">
                {Object.entries(rythmelieu).map(([key, value]) => (
                    <label key={key} onClick={() => handleCheckboxChange('rythmelieu', key)} data-aside="checkbox-label">
                    {value ? (
                        <CheckSquareOffset size={32} color="#004C3C" weight="duotone" />
                    ) : (
                        <Square size={32} color="#004C3C"  />
                    )}
                    <span>{(key === "tpsplein" ? "Temps Plein" : (key === "courte" ? "Formation courte" : key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')))}</span>
                    </label>
                ))}
                </div>
            </div>

            <div data-aside="filter-section">
                <h4>Durée</h4>
                <div data-aside="duration-slider">
                {/* Remplacez ceci par un composant de slider */}
                <span>2 jours</span>
                <div data-aside="slider"></div>
                <span>6 mois</span>
                </div>
            </div>

            <div data-aside="filter-section">
                <h4>Niveaux</h4>
                <div data-aside="checkbox-group">
                {Object.entries(levels).map(([key, value]) => (
                    <label key={key} onClick={() => handleCheckboxChange('levels', key)} data-aside="checkbox-label">
                    {value ? (
                        <CheckSquareOffset size={32} color="#004C3C" weight="duotone" />
                    ) : (
                        <Square size={32} color="#004C3C"  />
                    )}
                    <span>{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}</span>
                    </label>
                ))}
                </div>
            </div>
            </aside>
            <div data-mainresults>
                {formationsFiltres.map((formation) => 
                    <div data-card data-isfiltered="false">
                        <h5>{formation.name}</h5>
                        <button>{formation.metadatas.thematiques[0].titre}</button>
                        <PortableText value={formation.metadatas._rawDesc} components={components} />
                        <div data-modalites>
                            <Handshake weight="duotone" data-icone />Présentiel ou à distance
                        </div>
                        <div data-duree><CalendarSlash weight="duotone" data-icone />24h soit 3 jours</div>
                        <div data-diplome><Certificate weight="duotone" data-icone />{correctDiploma(formation.metadatas.niveau)}</div>
                        <Link to={"../" + formation.slug.current}>En savoir plus <ArrowCircleRight size={32} /></Link>
                    </div>
                )}
            </div>
          </section>
          </section>
        </main>
      </Layout>
    )
  }


export const Head = () => <Seo title="Accueil" />

export default FormationsPage