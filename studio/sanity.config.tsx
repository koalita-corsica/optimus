import {defineConfig} from 'sanity'
import {structureTool } from 'sanity/structure'
import {colorInput} from '@sanity/color-input'
import {schemaTypes} from './schemas'
import { frFRLocale } from '@sanity/locale-fr-fr'
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'
import {buildLegacyTheme} from 'sanity'

const props = {
  '--my-agex': '#d64c4c',
}

export const myTheme = buildLegacyTheme({
  /* Base theme colors */

  /* Brand */
  '--brand-primary': props['--my-agex'],

  // Default button
  '--default-button-primary-color': props['--my-agex'],

  /* State */
  '--state-info-color': props['--my-agex'],

  /* Navbar */

  '--focus-color': props['--my-agex'],
})

// const Logo = () => (
//   <img src="/static/logo.png" style={{objectFit:'cover', height:'100%', width: '100%'}} />
// );


export default defineConfig({
  name: 'default',
  title: 'Optimus',
  // icon: Logo,
  theme: myTheme,

  projectId: '01xufuk5',
  dataset: 'production',

  plugins: [structureTool(), colorInput(), frFRLocale(), unsplashImageAsset()],

  schema: {
    types: schemaTypes,
  },
})
