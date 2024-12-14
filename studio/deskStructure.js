import parentChild from './parentChild'
import formthem from './formationsThematiques';


export const optimusStructure = (S, context) => {
  return S.list()
      .title('Bonjour ' + context.currentUser?.name)
      .items([
        ...S.documentTypeListItems().filter(
          (listItem) => !['pages','thematiques','formations'].includes(listItem.getId() )
        ),
        formthem('formations', S, context.documentStore),
        parentChild('pages', S, context.documentStore),
        S.divider(),
        S.divider(),
        S.listItem()
          .title("Toutes les pages (dev only)")
          .child(
            S.documentTypeList('pages')
          ),
      ])
}