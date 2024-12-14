import {DotsThree} from '@phosphor-icons/react'

const Picto = () => (
  <DotsThree weight='duotone' />
)

export default {
  name: 'menu',
  title: 'Menu',
  type: 'document',
  icon: Picto,
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Nom de l\'item du menu',
    },
    {
      name: 'ordre',
      type: 'string',
      title: 'Ordre d\'affichage',
    },
    {
      name: 'image',
      type: 'image',
      title: 'Icône',
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: 'name',
        slugify: (input : any) => input
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
      name: 'texte',
      type: 'richText',
      title: "Texte",
    },
  ],
  preview: {
    select: {
      title: 'name',
      ordre: 'ordre',
    },
    prepare(selection : any) {
      const {title, items, ordre} = selection
      return {
        title: ordre + ". " + title,
      }
  },
  },
  orderings: [
    {
      title: 'Ordre croissant',
      name: 'ordrecroissant',
      by: [
        {field: 'ordre', direction: 'asc'}
      ]
    },
  ]
}
