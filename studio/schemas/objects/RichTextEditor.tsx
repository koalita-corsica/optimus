// RichTextEditor.js
import React from 'react'
import { defineType } from 'sanity'
import { BsFillGrid1X2Fill } from "@react-icons/all-files/bs/BsFillGrid1X2Fill";

const underlineIcon = () => (
  <span style={{ fontWeight: 'bold', color: '#de0123' }}>_</span>
)
const underlineDecorator = (props : any) => (
  <span style={{ borderBottom: ' solid 3px #de0123' }}>{props.children}</span>
)
const GalerieIcone = () => (
  <BsFillGrid1X2Fill color="#de0123" />
)



export default defineType({
  name: 'richText',
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
    { 
      title: 'Galerie d\'images',
      type: 'galerieimg',
      icon: GalerieIcone,
    }
  ]
})