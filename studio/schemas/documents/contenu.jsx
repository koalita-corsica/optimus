import { FileText } from '@phosphor-icons/react'

const Picto = () => (
  <FileText weight='duotone' />
)
export default {
  name: 'contenu',
  type: 'document',
  title: 'Pages de contenu',
  icon: Picto,
  fieldsets: [
    {
      name: "intro", 
      title: "Module d'introduction",
      options: {
        collapsible: true, 
        collapsed: false,
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
  ],  
  preview: {
    select: {
      title: 'name',
      subtitle: 'menu.name',
      hasparent: 'inter.pageinter',
      parentname: 'inter.pageparente.name',
      media: 'img'
    },
    prepare(selection) {
      const {title, subtitle, hasparent, parentname, media} = selection
      const sub = hasparent ? subtitle : subtitle + " > " + parentname + " > ⤴️"
      return {
        title,
        subtitle: 
          title === "Accueil" 
            ? "La plus belle page d'accueil de la galaxie" 
            : title === "Découvrir Optimus"
              ? "La page 'À propos'"
              : title === "Mentions légales"
                ? "Page de contenu obligatoire"
                : sub,
        media: selection.media
      }
  },
  }, 
}    