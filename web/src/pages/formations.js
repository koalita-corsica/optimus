import React, { useState } from "react"
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

    const [themes, setThemes] = useState({
      alternance: false,
      tempsPlein: false,
      distanciel: false,
      presentiel: false,
      formationCourte: false
    });
  
    const [levels, setLevels] = useState({
      qualifiante: true,
      niveau3: false,
      niveau4: false,
      niveau6: false,
      niveau5: false,
      niveau7: false
    });
  
    const [modalities, setModalities] = useState({
      interEntreprises: false,
      intraEntreprise: false,
      cpf: false
    });
  
    // Fonction pour gérer le clic sur une case à cocher
    const handleCheckboxChange = (group, option) => {
      switch (group) {
        case 'themes':
          setThemes(prev => ({ ...prev, [option]: !prev[option] }));
          let th = themes
          console.log("he", th[option])
          th[option] && console.log("he", th[option])
          break;
        case 'levels':
          setLevels(prev => ({ ...prev, [option]: !prev[option] }));
          break;
        case 'modalities':
          setModalities(prev => ({ ...prev, [option]: !prev[option] }));
          break;
        default:
          break;
      }
    };
  
    // Fonction pour réinitialiser tous les filtres
    const resetFilters = () => {
      setThemes({
        alternance: true,
        tempsPlein: true,
        distanciel: true,
        presentiel: true,
        formationCourte: true
      });
      setLevels({
        qualifiante: true,
        niveau3: true,
        niveau4: true,
        niveau6: true,
        niveau5: true,
        niveau7: true
      });
      setModalities({
        interEntreprises: true,
        intraEntreprise: true,
        cpf: true
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
                    {allThematiques.map((th) => 
                    <button data-aside="tag">{th.titre}</button>
                    )}
                </div>
            </div>

            <div data-aside="filter-section">
                <h4>Rythme & lieu</h4>
                <div data-aside="checkbox-group">
                {Object.entries(themes).map(([key, value]) => (
                    <label key={key} onClick={() => handleCheckboxChange('themes', key)} data-aside="checkbox-label">
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

            <div data-aside="filter-section">
                <h4>Modalités</h4>
                <div data-aside="checkbox-group">
                {Object.entries(modalities).map(([key, value]) => (
                    <label key={key} onClick={() => handleCheckboxChange('modalities', key)} data-aside="checkbox-label">
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
                    <div data-card>
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

