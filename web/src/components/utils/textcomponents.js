import * as React from "react"


const components = {
    marks: {
      internal: ({children, value}) => {
          return (
            <a href={value.url} style={{textDecoration: 'underline'}}>
              {children}
            </a>
          )
        },
        link: ({children, value}) => {
          return (
            <a href={value.url} target='_blank' rel="external noreferrer" style={{textDecoration: 'underline'}}>
              {children}
            </a>
          )
        },
        underline: ({ children }) => {
            return (
              <span data-underline>{children}</span>
            );
          },
    },
    types: {
      gallerieimg: ({value}) => {
        return (
          <div data-imageplus={value.img.length}>
            {value.img.map((img, i) => {
              return (
              <img src={img.asset.url} alt ={img.alt} key={i + 7123 * 234} />
              )
            })}
          </div>

        )
      }
    }
  }


  const gallerie = {
    types: {
        gallerieimg: ({value}) => {
          return (
            <div data-imageplus>
              {value.img.map((img, i) => {
                return (
                <img src={img.asset.url} alt ={img.alt} key={i + 7123 * 234} />
                )
              })}
            </div>
  
          )
        }
      }
  }

export {components, gallerie}