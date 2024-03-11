import {ListNumbers, Globe} from '@phosphor-icons/react'

const iconeDetails = () => (
    <ListNumbers size={32} weight="duotone" />
)

const icone = () => (
    <Globe size={32} weight="duotone" />
)


export default {
    name: 'identite',
    type: 'document',
    title: 'L\'identité de marque d\'Agex BE',
    icon: icone,
    fields: [
      {
        name: 'ordre',
        type: 'number',
        title: 'Numéro'
      },
      {
        name: 'name',
        type: 'string',
        title: 'Nom'
      },
      {
        name: 'idtext',
        type: 'richText',
        title: "Texte de présentation",
        description: "Le texte qui vient illustrer l\image et l\identité de marque"
      },
    ],
    orderings: [
        {
          title: 'Par ordre décroissant',
          name: 'orderDesc',
          by: [
            {field: 'ordre', direction: 'desc'}
          ]
        },
        {
          title: 'Par ordre croissant',
          name: 'orderAsc',
          by: [
            {field: 'ordre', direction: 'asc'}
          ]
        }
      ],
    preview: {
        select: {
            nom: 'name',
            ordre: 'ordre',
        },
        prepare(selection : any) {
            const {nom, ordre, media} = selection
            return {
            title: ordre + '. ' + nom,
            media: iconeDetails
            }
        }
    }
  }