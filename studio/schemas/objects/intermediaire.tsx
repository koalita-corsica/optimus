import { defineType } from 'sanity'

export default defineType({
    type: 'object',
    title: 'Module de page intermédiaire',
    name: 'intermediaire',
    fields: [
      {
        title: 'Cette page est une page intermédiaire',
        name: 'pageinter',
        type: 'boolean',
        initialValue: false,
      },
      {
        title: 'Page parente',
        name: 'pageparente',
        type: 'reference',
        to: { type: 'pages' },
        hidden: ({ parent }) => parent?.pageinter === true,
      },
    ],
})      