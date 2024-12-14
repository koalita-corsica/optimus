//Documents
import pages from './documents/pages'
import formations from './documents/formations'
import menu from './documents/menu'
import thematiques from './documents/thematiques'

// Objets
import RichTextEditor from './objects/RichTextEditor'
import RichTextSans from './objects/RichTextSans'
import galerieimg from './objects/galerie'
import blocinfos from './objects/blocinfos'
import metadatas from './objects/metadatas'
import jm from './objects/jm'
import intermediaire from './objects/intermediaire'
import resume from './objects/resume'
import contenu from './documents/contenu'

export const schemaTypes = [
    // Documents
    menu,
    pages,
    formations,
    thematiques,
    contenu,

    // obj
    RichTextEditor,
    RichTextSans,
    galerieimg,
    blocinfos,
    metadatas,
    jm,
    intermediaire,
    resume,
]