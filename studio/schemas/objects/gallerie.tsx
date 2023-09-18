import React from 'react'
import { defineType } from 'sanity'

export default defineType({
  name: 'gallerieimg',
  title: 'Gallerie',
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