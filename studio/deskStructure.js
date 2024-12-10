import parentChild from './parentChild'
import formthem from './formationsThematiques';


export const optimusStructure = (S, context) => {
  return S.list()
      .title('Bonjour ' + context.currentUser?.name)
      .items([
        ...S.documentTypeListItems().filter(
          (listItem) => !['pages','thematiques','formations'].includes(listItem.getId() )
        ),
        S.listItem()
          .title("Pages de contenu")
          .child(
            S.documentTypeList('pages')
              .filter('_type == "pages" && inter.pageinter != false && (name in ["Accueil", "Découvrir Optimus", "Mentions légales"])') // GROQ pour exclure
          ),
        formthem('formations', S, context.documentStore),
        parentChild('pages', S, context.documentStore),
        S.divider(),
        S.divider(),
        // S.listItem()
        //   .title("Toutes les pages (dev only)")
        //   .child(
        //     S.documentTypeList('pages')
        //   ),
      ])
}