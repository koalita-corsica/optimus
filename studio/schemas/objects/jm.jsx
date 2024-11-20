import { defineType } from 'sanity'

export default defineType ({
  name: 'jm',
  type: 'object',
  title: 'En jours ou en Mois',
  fieldset: 'duration',
  fields: [
    {
      name: 'jours',
      type: 'number',
      title: 'Jours',
      readOnly: ({ parent }) => Boolean(parent?.mois) // "jours" est readOnly si "mois" est rempli
    },
    {
      name: 'mois',
      type: 'number',
      title: 'Mois',
      readOnly: ({ parent }) => Boolean(parent?.jours) // "mois" est readOnly si "jours" est rempli
    }
  ]
})