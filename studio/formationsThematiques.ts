// ./src/desk-structure/parentChild.ts

import {DocumentStore} from 'sanity'
import {SanityDocument} from '@sanity/client'
import {StructureBuilder} from 'sanity/desk'
import {map} from 'rxjs/operators'
import { BookOpenText } from '@phosphor-icons/react'

export default function formthem(
  schemaType: string,
  S: StructureBuilder,
  documentStore: DocumentStore
) {
  const filter = `_type == "formations" || _id in path("drafts.**")`
  const query = `*[${filter}]{ _id, name}`
  const options = {apiVersion: `2024-12-01`}

  const cleanId = (id: string) => id.startsWith('drafts.') ? id.replace('drafts.', '') : id

  return S.listItem()
    .title('Formations & thématiques')
    .icon(BookOpenText)
    .child(() =>
      documentStore.listenQuery(query, {}, options).pipe(
        map((parents) =>
          S.list()
            .title('Formations & thématiques')
            .menuItems([
              S.menuItem()
                .title('Add')
                .intent({type: 'create', params: {type: "formations"}}),
            ])
            .items([
              // Create a List Item for Parents
              // To display all documents that do not have parents
              S.listItem()
                .title('Thématiques')
                .schemaType("thematiques")
                .child(() =>
                  S.documentList()
                    .schemaType("thematiques")
                    .title('Thématiques')
                    .filter('_type == "thematiques"') // Filter obligatoire
                    .child((id) => S.document().documentId(id).schemaType("thematiques"))
                ),
              S.divider(),
              // Create a List Item for each parent
              // To display all its child documents
              ...parents.map((parent: SanityDocument, i: number) => 
                S.listItem()
                  .title(parent.name || "Sans titre")
                  .child(S.document()
                  .schemaType('formations')
                  .documentId(cleanId(parent._id))
              )   
              ),
            ])
        )
      )
    )
}