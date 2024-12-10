import { defineType } from 'sanity'

export default defineType({
    type: 'object',
    title: 'Données génériques',
    name: 'metadatas',
    fieldsets: [
      {
        name: 'duration', 
        title: 'Durée de la formation',
        options: {
          columns: 2,
        }
      },
    ],
    fields: [
      {
        name: 'desc',
        type: 'richTextSans',
        title: "Description courte",
        description: "Il s'agit du paragraphe qui apparait dans la liste des formations",
        validation: Rule => Rule.custom(blocks => {
          const charCount = blocks
            ? blocks.reduce((total, block) => {
                if (block._type === 'block' && block.children) {
                  return total + block.children.reduce((sum, child) => {
                    return sum + (child.text || '').length;
                  }, 0);
                }
                return total;
              }, 0)
            : 0;
      
          return charCount <= 125
            ? true
            : 'Seuls les 125 premiers caractères seront affichés. (Actuellement : ' + charCount + ' caractères)';
        }).warning()
      },
      {
        title: "Thématiques",
        name: 'thematiques',
        type: 'array',
        description: 'La thématique en tête de liste sera celle affichée sur le site',
        of: [
          {
            type: 'reference',
            to: [
              {type: 'thematiques'},
            ]
          }
        ],
        options: {
          insertMenu: {
            showIcons: false,
          }
        }
      },
      {
        title: 'Rythme & lieu',
        name: 'rythmelieu',
        type: 'array',
        of: [{type: 'string'}],
        options: {
          list: [
            {title: 'Présentiel', value: 'presentiel'},
            {title: 'Distanciel', value: 'distanciel'},
            {title: 'Temps plein', value: 'tpsplein'},
            {title: 'Alternance', value: 'alternance'},
            {title: 'Formation courte', value: 'courte'}
          ]
        }
      },
      {
        name: 'jm',
        type: 'jm',
        title: 'En jours ou en Mois',
        fieldset: 'duration',
      },
      {
        title: 'Correspondance en heures',
        name: 'heures',
        type: 'number',
        description: 'Si applicable',
        fieldset: 'duration',
        initialValue: 0.0,
      },
      {
        title: "Niveau de diplôme",
        name: 'niveau',
        type: 'string',
        options: {
          list: [
            {title: 'Formation qualifiante', value: 'qualif'},
            {title: 'Diplôme de niveau 3', value: 'nv3'},
            {title: 'Diplôme de niveau 4', value: 'nv4'},
            {title: 'Diplôme de niveau 5', value: 'nv5'},
            {title: 'Diplôme de niveau 6', value: 'nv6'},
            {title: 'Diplôme de niveau 7', value: 'nv7'}
          ],
          layout: "dropdown",
        }
      },
    ]
})      