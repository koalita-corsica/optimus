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
    durees: allSanityFormations {
        nodes {
            metadatas {
                jm {
                  jours
                  mois
                }
                heures
            }
        }
    }
}
`


  const FormationsPage = (data) => {

    const allFormations = data.data.formations.nodes
    const allThematiques = data.data.thematiques.nodes
    const allDurations = data.data.durees.nodes
    const [formationsFiltres, setFormationsFiltres] = useState(allFormations)
    console.log("formations", allFormations)

    const [themes, setThemes] = useState({})
    const [rythmelieu, setRythmelieu] = useState({})
    const [duration, setDuration] = useState([])

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

      // Durées
      const processDurations = () => {
        const sortedDurations = allDurations
          .map((item) => {
            const jm = item.metadatas.jm || {}; // Récupère jm ou un objet vide s'il est null
            const { mois, jours } = jm; // Extraire mois et jours si jm existe
            const heures = item.metadatas.heures;
    
            // Normaliser les valeurs pour éviter les négatifs et prioriser : mois > jours > heures > "Durée à définir"
            if (mois !== null && mois !== undefined) return { label: `${Math.abs(mois)} mois`, value: Math.abs(mois) * 30 * 24 };
            if (jours !== null && jours !== undefined) return { label: `${Math.abs(jours)} jours`, value: Math.abs(jours) * 24 };
            if (heures !== null && heures !== undefined) return { label: `${Math.abs(heures)} heures`, value: Math.abs(heures) };
            return { label: "Durée à définir", value: Infinity }; // Cas où tout est null
          })
          .sort((a, b) => a.value - b.value) // Trier les durées par leur valeur
          .map((item) => item.label); // Extraire uniquement les labels
    
        setDuration([...new Set(sortedDurations)]); // Supprimer les doublons et mettre à jour l'état
      };
    
      processDurations();
    }, [allThematiques, allFormations, allDurations]);

    const [levels, setLevels] = useState({
      qualif: true,
      nv3: true,
      nv4: true,
      nv5: true,
      nv6: true,
      nv7: true
    });
  

    const filtrage = (updatedThemes, updatedRythmelieu, updatedLevels) => {
      const cards = document.querySelectorAll('[data-card]');
      cards.forEach(card => {
        const formationName = card.querySelector('h5').textContent;
        const formation = allFormations.find(f => f.name === formationName);
        if (!formation) return;
    
        const thematiquesMatch = Object.entries(updatedThemes).some(
          ([key, value]) => value && formation.metadatas.thematiques.some(t => t.titre === key)
        );
    
        const rythmelieuMatch = Object.entries(updatedRythmelieu).some(
          ([key, value]) => value && formation.metadatas.rythmelieu.includes(key)
        );
        
        const niveauMatch = Object.entries(updatedLevels).some(
          ([key, value]) => value && key === formation.metadatas.niveau
        );
    
        const isMatching = thematiquesMatch && rythmelieuMatch && niveauMatch;
    
        card.dataset.ismatching = isMatching;
      });
    };
    
    const handleCheckboxChange = (group, option) => {
      let updatedThemes = themes;
      let updatedRythmelieu = rythmelieu;
      let updatedLevels = levels;
    
      switch (group) {
        case 'themes':
          updatedThemes = { ...themes, [option]: !themes[option] };
          setThemes(updatedThemes);
          break;
    
        case 'rythmelieu':
          updatedRythmelieu = { ...rythmelieu, [option]: !rythmelieu[option] };
          setRythmelieu(updatedRythmelieu);
          break;
    
        case 'levels':
          updatedLevels = { ...levels, [option]: !levels[option] };
          setLevels(updatedLevels);
          break;
    
        default:
          break;
      }
    
      // Appel de la fonction filtrage avec les valeurs locales mises à jour
      filtrage(updatedThemes, updatedRythmelieu, updatedLevels);
    };
    
  
    // Fonction pour réinitialiser tous les filtres
    const resetFilters = () => {
      setLevels({
        qualif: true,
        nv3: true,
        nv4: true,
        nv5: true,
        nv6: true,
        nv7: true
      });
    };

    const correctDiploma = (nom) => {
      switch (nom) {
        case 'qualif':
          return "Formation qualifiante"
        case 'nv3':
        case 'niveau3':
          return "Diplôme de niveau 3"
        case 'nv4':
        case 'niveau4':
          return "Diplôme de niveau 4"
        case 'nv5':
        case 'niveau5':
          return "Diplôme de niveau 5"
        case 'nv6':
        case 'niveau6':
          return "Diplôme de niveau 6"
        case 'nv7':
        case 'niveau7':
          return "Diplôme de niveau 7"
        case null: 
          return "Non précisé"
        default:
          return nom
      }
    };

    
  const correctRythme = (rh) => {
    if (rh.includes("distanciel") && rh.includes("presentiel")) {
      return "Présentiel ou Distanciel";
    } else if (rh.includes("distanciel")) {
      return "Distanciel uniquement";
    } else if (rh.includes("presentiel")) {
      return "Présentiel uniquement";
    }
    return "À définir"; 
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
                    <span>{(key === "tpsplein" ? "Temps Plein" : (key === "courte" ? "Formation courte" : (key === "presentiel" ? "Présentiel" : key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1'))))}</span>
                    </label>
                ))}
                </div>
            </div>
{/* 
            <div data-aside="filter-section">
                <h4>Durée</h4>
                <div data-aside="duration-slider">
                <div data-aside="slider">    
                <input 
                  type="range" 
                  id="temp" 
                  name="temp" 
                  list="markers" 
                  step="1" 
                  min="0" 
                  max={duration.length - 1} 
                />
                <datalist id="markers">
                  {duration.map((du, i) => (
                    <option key={i} value={i} label={du}></option>
                  ))}
                </datalist>
              </div>

                </div>
            </div> */}

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
                    <span>{correctDiploma(key)}</span>
                    </label>
                ))}
                </div>
            </div>
            </aside>
            <div data-mainresults>
                {formationsFiltres.map((formation) => 
                    {
                      const duree = (infos) => {
                        let heures = infos.metadatas.heures || false
                        let jours = infos.metadatas.jm?.jours || false
                        let mois = infos.metadatas.jm?.mois || false
                        
                        if (mois && heures) {
                          return mois + " mois soit " + heures + " heures"
                        }
                        else if (jours && heures) {
                          return jours + " jours soit " + heures + " heures"
                        }
                        else if (heures) {
                          return heures + " heures"
                        }
                        else {
                          return "Durée adaptable à vos besoins"
                        }
                      }
                      let duration = duree(formation)
                      return (
                        <div data-card data-ismatching="true" key={formation.slug.current}>
                          <h5>{formation.name}</h5>
                          <button>{formation.metadatas.thematiques[0].titre}</button>
                          <PortableText value={formation.metadatas._rawDesc} components={components} />
                          <div data-modalites>
                              <Handshake weight="duotone" data-icone />{correctRythme(formation.metadatas.rythmelieu)}
                          </div>
                          <div data-duree><CalendarSlash weight="duotone" data-icone />{duration}</div>
                          <div data-diplome><Certificate weight="duotone" data-icone />{correctDiploma(formation.metadatas.niveau)}</div>
                          <Link to={"../" + formation.slug.current}>En savoir plus <ArrowCircleRight size={32} /></Link>
                      </div>
                    )}
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