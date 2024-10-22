import { defineType } from 'sanity'
import { Info, Target, BookOpen, Scroll  } from '@phosphor-icons/react'

export default defineType({
    type: 'object',
    title: 'Bloc d\'informations',
    name: 'blocinfos',
    fields: [
      {
        title: 'Faire apparaître le bloc info',
        type: 'boolean',
        name: 'display',
        initialValue: true
      },
      {
        title: <span><Info weight='duotone' />  Informations</span>,
        name: 'informations',
        type: 'richTextSans',
        hidden: ({document}) => !document.informations.display
      },
      {
        title: <span><Target weight='duotone' />  Objectifs pédagogiques</span>,
        name: 'objpedago',
        type: 'richTextSans',
        hidden: ({document}) => !document.informations.display
      },
      {
        title: <span><BookOpen weight='duotone' />  Programme</span>,
        name: 'programme',
        type: 'richTextSans',
        hidden: ({ document }) => !document.informations.display
      },
      {
        title: <span><Scroll weight='duotone' />  Modalités</span>,
        name: 'modalites',
        type: 'richTextSans',
        hidden: ({ document }) => !document.informations.display
      },
    ]
})      