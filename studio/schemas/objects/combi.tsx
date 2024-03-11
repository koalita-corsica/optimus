import { defineType } from 'sanity'
import {toPlainText} from '@portabletext/react'

export default defineType({
    type: 'object',
    title: 'Combinaison Image + Texte',
    name: 'combi',
    fieldsets: [
      {name: 'combi', title: 'Combi'}
    ],
    fields: [
      {
        title: 'Image',
        name: 'imgCombi',
        type: 'image',
        fields: [
          {
            name: 'alt',
            type: 'string',
            title: 'Texte alternatif',
          },
        ]
      },
      {
        title: 'Paragraphe',
        name: 'pCombi',
        type: 'richTextSans',
      },
    ],
    preview: {
        select: {
            texte: "pCombi",
            image: 'imgCombi',
            sub: 'imgCombi.alt'
        },
        prepare(selection : any) {
          const image = selection.image
          const text = toPlainText(selection.texte).slice(0, 15) + "..."
          return {
              title: text,
              subtitle: selection.sub? selection.sub : "⚠️ Pas de balise alt sur cette image ⚠️",
              media: image
              }
        }
    }
})      