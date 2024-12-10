import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {colorInput} from '@sanity/color-input'
import {schemaTypes} from './schemas'
import {frFRLocale} from '@sanity/locale-fr-fr'
import {unsplashImageAsset} from 'sanity-plugin-asset-source-unsplash'
import {buildLegacyTheme} from 'sanity'
import {IconManager} from 'sanity-plugin-icon-manager'
import {optimusStructure} from './deskStructure'
import { visionTool } from '@sanity/vision'

const props = {
  '--my-optimus': '#00D2A4',
}

export const myTheme = buildLegacyTheme({
  /* Base theme colors */
  '--brand-primary': props['--my-optimus'],
  '--default-button-primary-color': props['--my-optimus'],
  '--state-info-color': props['--my-optimus'],
  '--focus-color': props['--my-optimus'],
})

export default defineConfig({
  name: 'default',
  title: 'Optimus FAC',
  icon: (): JSX.Element => (
    <img
      src="/static/pictobbl.png"
      style={{objectFit: 'cover', height: '100%', width: '100%'}}
      alt="Icon"
    />
  ),
  theme: myTheme,

  projectId: '01xufuk5',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: optimusStructure,
    }),
    colorInput(),
    frFRLocale(),
    unsplashImageAsset(),
    IconManager(),
    visionTool(),
  ],

  schema: {
    types: schemaTypes, // Assurez-vous que schemaTypes est un tableau
    templates: (prev: any) => {
      const categoryChild = {
        id: 'ledooda',
        title: 'Salut c\'est le Dooda',
        schemaType: 'pages',
        parameters: [{name: 'parentId', title: 'Parent ID', type: 'string'}],
        value: ({parentId}: {parentId: string}) => ({
          parent: {_type: 'reference', _ref: parentId},
        }),
      }
      return [...prev, categoryChild]
    },
  },
})
