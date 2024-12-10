import {ListBullets} from '@phosphor-icons/react'

// Render a div that wraps the default preview component
function MyPreviewComponent(props: any) {
  return (
    <div style={{minHeight: '33px', display: 'flex', alignItems: 'center'}}>
      {props.title}
    </div>
  )
}

const Picto = () => (
  <ListBullets weight='duotone' />
)

export default {
    name: 'thematiques',
    type: 'document',
    title: 'Thématiques des formations',
    icon: Picto,
    components: {
      preview: MyPreviewComponent, // Add custom preview component
    },
    fields: [
      {
        name: 'titre',
        type: 'string',
        title: 'Titre',
      },
    ],
  }