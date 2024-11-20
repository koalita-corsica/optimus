import {DotsThree} from '@phosphor-icons/react'


export default {
  name: 'menu',
  title: 'Menu',
  type: 'document',
  icon: DotsThree,
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Nom de l\'item du menu',
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
    {
      name: 'subitems',
      title: 'Pages du sous-menu',
      type: 'array',
      of: [{ 
        type: 'reference', 
        to: [
          { type: 'pages' },
          { type: 'formations'}
        ],      
      }],
      options: {
        insertMenu: {
          showIcons: false,
        }
      }
    }
  ],
  preview: {
    select: {
      title: 'name',
      items: 'subitems',
    },
    prepare(selection : any) {
      const {title, items} = selection
      const hasitems = items.length > 0 ? "Menu avec " + items.length + " élément" + (items.length > 1 ? "s" : "") : "Pas d'éléments de sous-menu"
      return {
        title,
        subtitle: hasitems
      }
  },
  },
}
