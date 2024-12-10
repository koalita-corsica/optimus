// ./src/desk-structure/parentChild.ts

import {DocumentStore} from 'sanity'
import {SanityDocument} from '@sanity/client'
import {StructureBuilder} from 'sanity/desk'
import {map} from 'rxjs/operators'
import { Tag, Article } from '@phosphor-icons/react'

export default function parentChild(
  schemaType: string,
  S: StructureBuilder,
  documentStore: DocumentStore
) {
  const filter = `_type == "${schemaType}" && inter.pageinter == true`
  const query = `*[${filter}]{ _id, name, menu-> }`
  const options = {apiVersion: `2023-01-01`}
  return S.listItem()
    .title('Articles')
    .icon(Article)
    .child(() =>
      documentStore.listenQuery(query, {}, options).pipe(
        map((parents) =>
          S.list()
            .title('Toutes les catégories')
            .menuItems([
            ])
            .items([
              // Create a List Item for Parents
              // To display all documents that do not have parents
              S.listItem()
                .title('Détails des catégories')
                .schemaType(schemaType)
                .child(() =>
                  S.documentList()
                    .schemaType(schemaType)
                    .title('Catégories')
                    .filter(filter)
                    // Use this list for creating from parents menu
                    .canHandleIntent(
                      (intentName, params) =>
                        intentName === 'create' && params.template === 'pages'
                    )
                    .child((id) => S.document().documentId(id).schemaType(schemaType))
                ),
              S.divider(),
              // Create a List Item for each parent
              // To display all its child documents
              ...parents.map((parent: SanityDocument) => {
                console.log("ici", parent) 
                return (
                    S.listItem({
                    id: parent._id,
                    title: parent.menu.name + " -> " + parent.name,
                    icon: Tag,
                    schemaType,
                    child: (michel) =>
                        S.documentTypeList(schemaType)
                        .title(parent.name)
                        .filter(`_type == "pages" && inter.pageparente._ref == $michel`)
                        .params({schemaType, parentId: parent._id, michel})
                        // Use this list for creating from child menu
                        .canHandleIntent(
                            (intentName, params) =>
                            intentName === 'create' && params.template === 'ledooda'
                        )
                        .initialValueTemplates([
                            S.initialValueTemplateItem('ledooda', {
                            parentId: parent._id,
                            }),
                        ]),
                    }))
              }),
            ])
        )
      )
    )
}