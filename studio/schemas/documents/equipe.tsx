import {UserList} from '@phosphor-icons/react'

const icone = () => (
    <UserList size={32} weight="duotone" />
)


export default {
    name: 'equipe',
    type: 'document',
    title: 'L\'équipe d\'Agex BE',
    icon: icone,
    fields: [
      {
        name: 'name',
        type: 'string',
        title: 'Nom'
      },
      {
        name: 'ordre',
        type: 'number',
        title: 'Ordre d\'affichage'
      },
      {
        name: 'portrait',
        type: 'image',
        title: 'Nom',
        fields:[
          {
            name: 'alt',
            type: 'string',
            title: 'Balise Alt',
          },
        ]
      }
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
            media: 'portrait'
        },
        prepare(selection : any) {
            const {nom, ordre, media} = selection
            return {
            title: ordre + '. ' + nom,
            media
            }
        }
    }
  }