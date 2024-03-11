/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"

import Header from "../header/header"
import Footer from "../footer/footer"
import * as layoutStyle from './layout.module.scss'
import { Link } from "gatsby"

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <h1 className={layoutStyle.titre}>h1</h1>
      <h2>h2</h2>
      <h3>h3</h3>
      <h4>h4</h4>
      <p>Body</p>
      <Link to="#" data-link="Internal">Link</Link>
      <br />
      <Link to="#" data-link="Item">Item</Link>
      <ul>
        <li>List</li>
        <li>List</li>
        <li>List</li>
      </ul>
      <ol>
        <li>List</li>
        <li>List</li>
        <li>List</li>
      </ol>
        <main>{children}</main>
        <Footer />
    </>
  )
}

export default Layout
