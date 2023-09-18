import {VscGroupByRefType} from '@react-icons/all-files/vsc/VscGroupByRefType'
export default {
    name: 'categories',
    type: 'document',
    title: 'Catégories',
    icon: VscGroupByRefType,
    fields: [
      {
        name: 'titre',
        type: 'string',
        title: 'Titre'
      },
      {
        title: 'Slug',
        name: 'slug',
        type: 'slug',
        options: {
          source: 'titre',
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
        title: 'Picto',
        name: 'picto',
        type: 'image',
      },
    ]
  }