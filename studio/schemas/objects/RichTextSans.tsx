// RichTextEditorSans.js
import { defineType } from 'sanity'

const underlineIcon = () => (
  <span style={{ fontWeight: 'bold', color: '#00D2A4' }}>_</span>
)
const underlineDecorator = (props : any) => (
  <span style={{ borderBottom: ' solid 2px #00D2A4' }}>{props.children}</span>
)


export default defineType({
  name: 'richTextSans',
  title: 'Content',
  type: 'array',
  of: [
    {
      type: 'block',
      marks: {
        decorators: [
          { title: 'Gras', value: 'strong' },
          { title: 'Italique', value: 'em' },
          {
            title: 'Souligné',
            value: 'underline',
            icon: underlineIcon,
            component: underlineDecorator
          },
        ]
      },
      lists: [
        {title: 'Liste à puce', value: 'bullet'},
        {title: 'Liste ordonnée', value: 'number'}
      ], 
    },
  ]
})