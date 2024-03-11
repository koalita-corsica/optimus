import { Browser } from '@phosphor-icons/react'

const Picto = () => (
  <Browser weight='duotone' />
)
export default {
  name: 'pages',
  type: 'document',
  title: 'Pages',
  icon: Picto,
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Nom de la page',
      description: 'Il ne s\'agit que du nom de la page, il n\'apparait pas sur le site'
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: 'name',
        slugify: (input) => input
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-zA-Z0-9]/g, ' ')
          .replace(/\s+/g, '-')
          .replace(/-+$/, '')
          .slice(0, 200)
          .toLowerCase()
      }
    },
    {
      name: 'titre',
      type: 'string',
      title: 'Titre',
      description: 'Le titre de la page qui apparait tout en haut',
    },
    {
      name: 'intro',
      type: 'richText',
      title: "Introduction",
      description: "Le paragraphe d\'introduction sous le titre"
    },
    {
      title: 'Image principale',
      name: 'img',
      type: 'image',
      description: 'L\'image principale de la page',
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Balise Alt',
        },
      ],
    },
    {
      title: 'Titre du bouton de gauche',
      name: 'buttonun',
      type: 'string',
      hidden: ({ document }) => document?.name !== 'Accueil'
    },
    {
      title: 'Titre du bouton de droite',
      name: 'buttondeux',
      type: 'string',
      hidden: ({ document }) => document?.name !== 'Accueil'
    },
    {
      name: 'plus',
      type: 'richText',
      title: "La phrase \'Pour en savoir plus\'",
      hidden: ({ document }) => document?.name !== 'Accueil' || document?.name !== 'Nos réalisations'
  },
  {
    name: 'secdeuxtun',
    type: 'string',
    title: 'Section 2 : premier titre',
    description: "La première ligne du titre de la 2eme section de la page",
    hidden: ({ document }) => document?.name !== 'Accueil'
  },
  {
    name: 'secdeuxtdeux',
    type: 'string',
    title: 'Section 2 : second titre',
    description: "La seconde ligne du titre de la 2eme section de la page",
    hidden: ({ document }) => document?.name !== 'Accueil'
  },
  {
    title: 'L\'équipe',
    name: 'equipe',
    type: 'array',
    description: 'Choisissez les membres qui seront sur la page d\'accueil',
    of: [
      {
        type: 'reference',
        title: 'Membres de l\'équipe',
        to: [
          {type: 'equipe'},
        ]
      }
    ],
    hidden: ({ document }) => document?.name !== 'Accueil'
  },
  {
    title: 'L\'identité de marque',
    name: 'idmarque',
    type: 'array',
    description: 'Ajoutez les éléments définissant l\'identité de marque d\'Agex BE',
    of: [
      {
        type: 'reference',
        title: 'Éléments de l\'identité de marque',
        to: [
          {type: 'identite'},
        ]
      }
    ],
    hidden: ({ document }) => document?.name !== 'Accueil'
  }
  ],
}    