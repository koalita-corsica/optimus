// RichTextEditor.js
import React from 'react'
import { defineType } from 'sanity'
import {ImagesSquare} from '@phosphor-icons/react'

const underlineIcon = () => (
  <span style={{ fontWeight: 'bold', color: '#00D2A4' }}>_</span>
)
const underlineDecorator = (props : any) => (
  <span style={{ borderBottom: ' solid 1px #00D2A4' }}>{props.children}</span>
)
const GalerieIcone = () => (
  <ImagesSquare color="#00D2A4" />
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