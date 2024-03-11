import { GlobeHemisphereEast } from '@phosphor-icons/react'

const icone = () => (
  <GlobeHemisphereEast size={32} weight="duotone" />
)
export default {
    name: 'pros',
    type: 'document',
    title: 'Activités : Entreprises & Collectivités',
    icon: icone,
    fields: [
      {
        name: 'titre',
        type: 'string',
        title: 'Titre'
      },
      {
        title: 'Mettre cette activité en premier',
        name: 'une',
        type: 'boolean',
        initialValue: false
      },
      {
        title: 'Ordre d\'affichage',
        name: 'ordre',
        type: 'number',
        hidden: ({ document }) => document?.une !== false
      },
      {
        title: 'Choix du modèle de présentation',
        name: 'genre',
        type: 'string',
        options: {
          list: [
            {title: 'Quinconce : Image + texte en quinconce', value: 'quinconce'},
            {title: 'Texte sans image', value: 'text'},
            {title: 'Galerie : Texte + galerie d\'images', value: 'gal'},
          ], 
          layout: 'radio' // <-- defaults to 'dropdown'
        },
        hidden: ({ document }) => document?.une !== false
      },
      {
        name: 'txtune',
        type: 'une',
        title: "Contenu",
        hidden: ({ document }) => document?.une !== true
      },
      {
        name:'tempQuinconce',
        type:'quinconce',
        title: 'Contenu du quinconce',
        description: 'Cliquez sur "+ Ajouter un élément" pour ajouter un ensemble "Image + Texte',
        hidden: ({ document }) => document?.genre !== 'quinconce'
      },
      {
        name: 'contenuTemplate',
        type: 'richText',
        title: "Contenu du texte seul",
        hidden: ({ document }) => document?.genre !== 'text'
      },
      {
        name: 'tempGal',
        type: 'GalerieCombi',
        title: "Contenu de la galerie",
        hidden: ({ document }) => document?.genre !== 'gal'
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
          const {titre, featured, ordre} = selection
          return {
          title: ordre ? ordre + '. ' + titre : '↑. ' + titre, 
          media: featured ?  <GlobeHemisphereEast size={32} color="#d64c4c" weight="fill" /> : <GlobeHemisphereEast size={32} weight="duotone" />
          }
      }
  }    
}