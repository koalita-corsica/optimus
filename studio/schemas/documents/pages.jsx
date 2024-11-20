import { Browser } from '@phosphor-icons/react'

const Picto = () => (
  <Browser weight='duotone' />
)
export default {
  name: 'pages',
  type: 'document',
  title: 'Pages',
  icon: Picto,
  fieldsets: [
    {
      name: "intro", 
      title: "Module d'introduction",
      options: {
        collapsible: true, 
        collapsed: true,
      },
    },
    {
      name: "p1", 
      title: "Premier paragraphe",
      options: {
        collapsible: true, 
        collapsed: true,
      },
      hidden: ({document}) => document?.name === 'Accueil'
    },
    {
      name: "p2", 
      title: "Second paragraphe",
      options: {
        collapsible: true, 
        collapsed: true,
      },
      hidden: ({document}) => document?.name === 'Accueil'
    },
    {
      name: "inter",
      title: "Page intermédiaire",
      options: {
        collapsible: true, 
        collapsed: true,
      },
      hidden: ({document}) => document?.name === 'Accueil'
    }
  ],
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Nom de la page',
      readOnly: ({document}) => document?.name === 'Accueil'
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
      },
      hidden: ({document}) => document?.name === 'Accueil'
    },
    {
      name: 'menu',
      title: 'Rubrique parente du menu',
      type: 'reference',
      to: [{type: 'menu'}],
      hidden: ({document}) => document?.name === 'Accueil'
    },
    {
      name: 'inter',
      title: 'Page intermédiaire',
      type: 'intermediaire',
      hidden: ({document}) => document?.name === 'Accueil',
      fieldset: 'inter',
    },
    {
      name: 'intro',
      type: 'richText',
      title: "Introduction",
      fieldset: 'intro',
    },
    {
      title: 'Image principale',
      name: 'img',
      type: 'image',
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
      name: 'une',
      title: 'Article à la une',
      type: 'reference',
      to: [{type: 'pages'}],
      hidden: ({document}) => document?.name != 'Accueil'
    },
    {
      type: 'richText',
      name: 'p1',
      title: "Contenu",
      fieldset: "p1"
    },
    {
      type: 'richText',
      name: 'p2',
      title: "Contenu",
      fieldset: "p2"
    },
    {
      type: 'richText',
      name: 'shortdesc',
      title: "Description courte (article à la une)",
      hidden: ({document}) => document?.name === 'Accueil',
    },
    {
      title: 'Bloc d\'informations',
      name: 'informations',
      type: 'blocinfos',
      hidden: ({document}) => document?.name === 'Accueil',
      options: {
        collapsible: true, 
        collapsed: true, 
      }
    },
    {
      title: 'En résumé',
      name: 'enresume',
      type: 'resume',
      options: {
        collapsible: true, 
        collapsed: true, 
      }
    },
  ],  
  preview: {
    select: {
      title: 'name',
      subtitle: 'menu.name',
      hasparent: 'inter.pageinter',
      parentname: 'inter.pageparente.name'
    },
    prepare(selection) {
      const {title, subtitle, hasparent, parentname} = selection
      const sub = hasparent ? subtitle : subtitle + " > " + parentname + " > ⤴️"
      return {
        title,
        subtitle: title === "Accueil" ? "La plus belle page d'accueil de la galaxie" : sub
      }
  },
  }, 
}    