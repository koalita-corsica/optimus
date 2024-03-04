import {defineConfig} from 'sanity'
import {structureTool } from 'sanity/structure'
import {colorInput} from '@sanity/color-input'
import {schemaTypes} from './schemas'
import { frFRLocale } from '@sanity/locale-fr-fr'

// const Logo = () => (
//   <img src="/static/logo.png" style={{objectFit:'cover', height:'100%', width: '100%'}} />
// );


export default defineConfig({
  name: 'default',
  title: 'Boilerplate',
  // icon: Logo,

  projectId: 'xxx',
  dataset: 'production',

  plugins: [structureTool(), colorInput(), frFRLocale()],

  schema: {
    types: schemaTypes,
  },
})
