import { Browser } from '@phosphor-icons/react'

const Picto = () => (
  <Browser weight='duotone' />
)
export default {
  name: 'formations',
  type: 'document',
  title: 'Formations',
  icon: Picto,
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Nom de la formation',
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: 'name',
        slugify: (input: any) => input
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
      name: 'description',
      type: 'richTextSans',
      title: "Description",
      description: "Le paragraphe d\'introduction sous le titre"
    },
    {
        title: 'Bloc d\informations',
        name: 'informations',
        type: 'blocinfos'
    }
  ],
}    