import { FilmStrip } from '@phosphor-icons/react'

const icone = () => (
  <FilmStrip size={32} weight="duotone" />
)
export default {
    name: 'realisations',
    type: 'document',
    title: 'Réalisations',
    icon: icone,
    fields: [
      {
        name: 'titre',
        type: 'string',
        title: 'Titre'
      },
      {
        title: 'Ordre d\'affichage',
        name: 'ordre',
        type: 'number',
      },
      {
        title: 'Image',
        type: 'image',
        name: 'image'
      },
      {
        name: 'txt',
        type: 'richText',
        title: "Courte description de la réalisation",
      },
    ],
    orderings: [
      {
        title: 'Par ordre décroissant',
        name: 'orderDesc',
        by: [
          {field: 'une', direction: 'desc'},
          {field: 'ordre', direction: 'desc'}
        ]
      },
      {
        title: 'Par ordre croissant',
        name: 'orderAsc',
        by: [
          {field: 'une', direction: 'desc'},
          {field: 'ordre', direction: 'asc'}
        ]
      }
    ],
    preview: {
      select: {
          titre: 'titre',
          featured: 'une',
          ordre: 'ordre'
      },
      prepare(selection) {
          const {titre, ordre} = selection
          return {
          title: ordre ? ordre + '. ' + titre : '-. ' + titre, 
          }
      }
  }    
}