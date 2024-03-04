// RichTextEditor.js
import React from 'react'
import { defineType } from 'sanity'
import { BsFillGrid1X2Fill } from "@react-icons/all-files/bs/BsFillGrid1X2Fill";

const HighlightIcon = () => (
  <span style={{ fontWeight: 'bold', color: '#663189' }}>V</span>
)
const HighlightDecorator = (props : any) => (
  <span style={{ backgroundColor: '#663189' }}>{props.children}</span>
)
const GalerieIcone = () => (
  <BsFillGrid1X2Fill color="white" />
)



export default defineType({
  name: 'contenugprh',
  title: 'Content',
  type: 'array',
  of: [
    {
      type: 'block',
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          {
            title: 'Surlignage',
            value: 'highlight',
            icon: HighlightIcon,
            component: HighlightDecorator
          },
        ]
      },
      lists: [
        {title: 'Bullet', value: 'bullet'},
        {title: 'Numbered', value: 'number'}
      ], 
    },
    {
      type: 'galerieimg',
      icon: GalerieIcone,
    }
  ]
})