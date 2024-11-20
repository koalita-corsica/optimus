import {VscGroupByRefType} from '@react-icons/all-files/vsc/VscGroupByRefType'

// Render a div that wraps the default preview component
function MyPreviewComponent(props: any) {
  return (
    <div style={{minHeight: '33px', display: 'flex', alignItems: 'center'}}>
      {props.title}
    </div>
  )
}

export default {
    name: 'thematiques',
    type: 'document',
    title: 'Thématiques des formations',
    icon: VscGroupByRefType,
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