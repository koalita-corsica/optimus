import {defineConfig} from 'sanity'
import {structureTool } from 'sanity/structure'
import {colorInput} from '@sanity/color-input'
import {schemaTypes} from './schemas'
import { frFRLocale } from '@sanity/locale-fr-fr'
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'
import {buildLegacyTheme} from 'sanity'

const props = {
  '--my-optimus': '#00D2A4',
}

export const myTheme = buildLegacyTheme({
  /* Base theme colors */

  /* Brand */
  '--brand-primary': props['--my-optimus'],

  // Default button
  '--default-button-primary-color': props['--my-optimus'],

  /* State */
  '--state-info-color': props['--my-optimus'],

  /* Navbar */

  '--focus-color': props['--my-optimus'],
})

const Logo = () => (
  <img src="/static/pictobbl.png" style={{objectFit:'cover', height:'100%', width: '100%'}} />
);


export default defineConfig({
  name: 'default',
  title: 'Optimus FAC',
  icon: Logo,
  theme: myTheme,

  projectId: '01xufuk5',
  dataset: 'production',

  plugins: [structureTool(), colorInput(), frFRLocale(), unsplashImageAsset()],

  schema: {
    types: schemaTypes,
  },
})
