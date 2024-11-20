import * as React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout/layout"
import Seo from "../components/seo/seo"

import { ListStar, ChatsCircle, ArrowCircleRight, Info} from "@phosphor-icons/react"


import { PortableText } from "@portabletext/react"
import { components } from "../components/utils/textcomponents"
import Carrousel from "../components/carrousel/carrousel"
import Informations from "../components/informations/informations"
import Resume from "../components/resume/resume"


export const pageQuery = graphql`
   query($id: String!) {
    intermediaire: sanityPages(_id: {eq: $id}) {
        name
        _rawIntro(resolveReferences: {maxDepth: 10})
        _rawImg(resolveReferences: {maxDepth: 10})
        slug {
          current
        }
        menu {
          slug {
            current
          }
        }
    }
    all: allSanityPages(filter: {inter: {pageinter: {eq: false}}}) {
      nodes {
        name
        menu {
          slug {
            current
          }
        }
        slug {
          current
        }
      }
    }
}
`


  const Intermediaire = (data) => {

    const intermediaire = data.data.intermediaire
    const liste = data.data.all.nodes.filter((item) => item.menu.slug.current === intermediaire.menu.slug.current)
    

    return (
      <Layout>
        <main data-page="intermediaire">
          <section data-hero>
            <img src={intermediaire._rawImg?.asset.url} alt={intermediaire._rawImg?.alt} />
          </section>
          <section data-pagecontent>
            <div data-intro>
              <h1><Info weight="duotone" size={45} className="data-icone" color="#218771" />{intermediaire.name}</h1>
              <PortableText value={intermediaire._rawIntro} components={components} />
            </div>
          </section>
          <section data-pagelinks>
            {liste.map((page) => 
            <div key={page.slug.current} data-card>
              <Link to={"/" + intermediaire.menu.slug.current + "/" + intermediaire.slug.current + "/" + page.slug.current}>
                <h4>{page.name}</h4>
              </Link>
            </div>
            )}
          </section>
          <Carrousel />
        </main>
      </Layout>
    )
  }


export const Head = () => <Seo title="Accueil" />

export default Intermediaire