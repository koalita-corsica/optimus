import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

// Penser a importer le logo et les favicons dans le dossier static

export default defineConfig({
  name: 'default',
  title: 'Domaine Vaccelli',

  projectId: '0w9zpvxh',
  dataset: 'production',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
