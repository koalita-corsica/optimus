import { Cards } from '@phosphor-icons/react'

const Picto = () => (
  <Cards weight='duotone' />
)
export default {
  name: 'formations',
  type: 'document',
  title: 'Formations',
  icon: Picto,
  fieldsets: [
    {
      name: 'intro', 
      title: 'Bloc d\'introduction',
      options: {
        collapsible: true, 
        collapsed: true,
      }
    },
    {
      name: "metadata", 
      title: "Informations générales",
      options: {
        collapsible: true, 
        collapsed: true,
      },
    },
  ],
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
      name: 'intro',
      type: 'richText',
      title: "Introduction",
      description: "Le paragraphe d\'introduction sous le titre",
      fieldset: 'intro'
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
      fieldset: 'intro'
    },
    {
      name: 'tag',
      title: 'Étiquette',
      type: 'string',
      description: "Texte de l'étiquette sur l'image",
      fieldset: 'intro'
    },
    {
      title: 'Brochure',
      name: 'brochure',
      type: 'file',
      options: {
        collapsible: true, 
        collapsed: true, 
      }
    },
    {
        title: 'Bloc d\'informations',
        name: 'informations',
        type: 'blocinfos',
        options: {
          collapsible: true, 
          collapsed: true, 
        }
    },
    {
      title: 'Données de filtres',
      name: 'metadatas',
      type: 'metadatas',
      options: {
        collapsible: true, 
        collapsed: true, 
      }
  }
  ],
}    