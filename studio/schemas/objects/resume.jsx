import { defineType } from 'sanity'

export default defineType ({
  name: 'resume',
  type: 'object',
  title: 'En résumé',
  fields: [
    {
      name: 'display',
      type: 'boolean',
      title: 'Afficher le bloc sur la page',
      initialValue: false,
    },
    {
      name: 'texte',
      type: 'richTextSans',
      title: 'Résumé',
    },
    {
      title: 'Image',
      name: 'img',
      type: 'image',
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Balise Alt',
        },
      ],
    }
  ]
})