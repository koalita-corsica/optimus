import {RiArticleFill} from '@react-icons/all-files/ri/RiArticleFill'
export default {
    name: 'blog',
    type: 'document',
    title: 'Blog',
    icon: RiArticleFill,
    fields: [
      {
        name: 'titre',
        type: 'string',
        title: 'Titre'
      },
      {
        title: 'Image principale',
        name: 'img',
        type: 'image',
      },
      {
        title: 'Catégories',
        name: 'cat',
        type: 'array',
        validation: (Rule : any) => [
          Rule.unique().error('Catégorie en double')
        ],
        options: {
          layout: 'grid'
        },
        of: [
          {
            type: 'reference',
            to: [{type: 'categories'},],
          }
        ],
      },
      {
        title: 'Mettre cet article à la une ?',
        name: 'une',
        type: 'boolean'
      },
      {
        title: 'Date de publication',
        name: 'datepubli',
        type: 'date',
        options: {
          dateFormat: 'DD-MM-YYYY',
        }
      },
      {
        name: 'contenu',
        type: 'richText',
        title: "Contenu"
      },
      {
        name: 'galerieimg',
        type: 'galerieimg',
        title: 'Galerie'
      }
    ],
    preview: {
      select: {
          titre: 'titre',
          date: 'datepubli', 
          featured: 'une',
          categorie1: 'cat.0.titre',
          categorie2: 'cat.1.titre',
          categorie3: 'cat.2.titre',
          categorie4: 'cat.3.titre',
          categorie5: 'cat.4.titre',
      },
      prepare(selection : any) {
          const {titre, date, featured, categorie1, categorie2, categorie3, categorie4, categorie5} = selection
          const categories = [categorie1, categorie2, categorie3, categorie4, categorie5].filter(Boolean)
          const subtitle = categories.length > 0 ? `${categories.join(' ● ')}` : 'Pas de catégorie'
          const d = new Date(date)
          const m = d.toLocaleString("fr-FR", {month: "short", day: "numeric"})
          return {
          title: m + "  | " + titre,
          subtitle,
          media: featured ?  <RiArticleFill color="yellow"/> : <RiArticleFill color="#663189"/>
          }
      }
  }    
}