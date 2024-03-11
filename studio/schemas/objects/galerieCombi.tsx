import { defineType } from 'sanity'
import {toPlainText} from '@portabletext/react'

export default defineType({
    type: 'object',
    title: 'Combinaison Texte + gGlerie',
    name: 'GalerieCombi',
    fieldsets: [
      {name: 'combi', title: 'Combi avec galerie'}
    ],
    fields: [
        {
            title: 'Paragraphe',
            name: 'pCombi',
            type: 'richTextSans',
        },
        {
          title: 'Galerie',
          name: 'galerieimgcombi',
          type: 'galerieimg',
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