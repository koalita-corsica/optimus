import * as React from "react"
import {Icon} from '@iconify/react'

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
      },
      'icon.manager': ({value}) => {
        console.log("hello", value)
        const {icon, metadata: {flip, rotate, size, color} } = value
        return (
          <Icon
            icon={icon}
            flip={flip}
            rotate={rotate}
            width={size.width}
            height={size.height}
            style={{color: color.hex}}
          />
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