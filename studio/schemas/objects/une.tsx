import { defineType } from 'sanity'

export default defineType({
  name: 'une',
  type: 'object',
  fieldsets: [
    {name: 'une', title: 'Activité mise en avant',}
  ],
  fields: [
    {
        title: 'Images',
        name: 'img',
        type: 'array',
        of: [{
            type: 'image',
            fields:[
              {
                name: 'alt',
                type: 'string',
                title: 'Balise Alt',
              },
            ]
        }],
    },
    {
        name: 'texteune',
        type: 'richText',
        title: "Texte de présentation",
        description: "Le texte qui vient illustrer l\'activité mise en avant"
    },
  ]
})