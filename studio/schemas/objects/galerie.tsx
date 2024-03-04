import React from 'react'
import { defineType } from 'sanity'

export default defineType({
  name: 'galerieimg',
  title: 'Galerie',
  type: 'object',
  fields: [
    {
        title: 'Images',
        name: 'img',
        type: 'array',
        of: [{
            type: 'image',
        }]
      }
  ]
})