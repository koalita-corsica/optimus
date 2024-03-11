import { Users } from '@phosphor-icons/react'

const icone = () => (
  <Users size={32} weight="duotone" />
)
export default {
    name: 'particuliers',
    type: 'document',
    title: 'Activités : Particuliers',
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
        name: 'stitre',
        type: 'string',
        title: 'Sous-titre'
      },
      {
        name: 'paragraphe',
        type: 'richText',
        title: 'Description'
      },
      {
        name: 'image',
        type: 'image',
        title: 'Image',
        fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Balise Alt',
        },
      ],
      },
    ],
    orderings: [
      {
        title: 'Par ordre décroissant',
        name: 'orderDesc',
        by: [
          {field: 'ordre', direction: 'desc'}
        ]
      },
      {
        title: 'Par ordre croissant',
        name: 'orderAsc',
        by: [
          {field: 'ordre', direction: 'asc'}
        ]
      }
    ],
    preview: {
      select: {
          titre: 'titre',
          ordre: 'ordre',
          image: 'image'
      },
      prepare(selection) {
          const {titre, image, ordre} = selection
          return {
          title: ordre ? ordre + '. ' + titre : 'x. ' + titre, 
          media: image
          }
      }
  }    
}