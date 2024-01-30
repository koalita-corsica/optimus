import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {frFRLocale} from '@sanity/locale-fr-fr'

// const Logo = () => (
//   <img src="/static/[LOGO]" style={{objectFit:'cover', height:'100%', width: '100%'}} />
// );

export default defineConfig({
  name: 'default',
  title: 'koaliplate',

  projectId: 'ftbtijdq',
  dataset: 'production',

  // icon: Logo,

  plugins: [deskTool(), visionTool(), frFRLocale()],

  schema: {
    types: schemaTypes,
  },
})
