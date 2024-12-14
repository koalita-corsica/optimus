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
            .menuItems([])
            .items([
              // List Item for "Détails des catégories"
              S.listItem()
                .title('Détails des catégories')
                .schemaType(schemaType)
                .child(() =>
                  S.documentList()
                    .schemaType(schemaType)
                    .title('Catégories')
                    .filter(filter)
                    .canHandleIntent(
                      (intentName, params) =>
                        intentName === 'create' && params.template === 'pages'
                    )
                    .child((id) => S.document().documentId(id).schemaType(schemaType))
                ),
              S.divider(),
              // Dynamically generate a list item for each parent
              ...parents
                .filter((parent: SanityDocument) => parent && parent.name && parent.menu && parent.menu.name) // Ensure all necessary fields are defined
                .map((parent: SanityDocument, i: number) => {
                  console.log("Parent:", parent); // Debugging log
                  return S.listItem({
                    id: `${parent._id}`,
                    title: `${i + 1} | ${parent.name} (${parent.menu.name})`,
                    icon: Tag,
                    schemaType,
                    child: (michel) =>
                      S.documentTypeList(schemaType)
                        .title(parent.name)
                        .filter(`_type == "pages" && inter.pageparente._ref == $michel`)
                        .params({ schemaType, parentId: parent._id, michel })
                        .canHandleIntent(
                          (intentName, params) =>
                            intentName === 'create' && params.template === 'ledooda'
                        )
                        .initialValueTemplates([
                          S.initialValueTemplateItem('ledooda', {
                            parentId: parent._id,
                          }),
                        ]),
                  });
                }),
            ])
        )
      )
    )
}
