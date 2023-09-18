import {GoTasklist} from '@react-icons/all-files/go/GoTasklist'
import {BiTask} from '@react-icons/all-files/bi/BiTask'

export default {
    name: 'missions',
    type: 'document',
    title: 'Nos missions',
    icon: GoTasklist,
    fields: [
      {
        name: 'title',
        type: 'string',
        title: 'Titre'
      },
      {
        name: 'ordre',
        type: 'number',
        title: 'Ordre d\'affichage'
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
            title: 'title',
            ordre: 'ordre',
        },
        prepare(selection : any) {
            const {title, ordre} = selection
            return {
            title: ordre + '. ' + title,
            media: BiTask
            }
        }
    }
  }