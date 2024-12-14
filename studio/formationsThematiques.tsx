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
  const query = `*[${filter}] | order(lower(name) asc){ _id, name, "imageUrl": img.asset->url}`
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
                .title('Ajouter une nouvelle formation')
                .intent({ type: 'create', params: { type: 'formations' } })
            ])
            .items([
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
              ...parents
                .filter((parent: SanityDocument) => parent && parent.name)
                .map((parent: SanityDocument, i: number) => 
                S.listItem()
                  .title((i + 1) + ". " + (parent.name || "Sans titre"))
                  .icon(() => {
                    console.log(parent)
                    if (parent.imageUrl) {
                      return <img src={parent.imageUrl} style={{ width: '24px', height: '24px', objectFit: 'cover' }} alt="Preview" />;
                    }
                    return <span>🖼️</span>; // Emoji or fallback icon
                  })
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