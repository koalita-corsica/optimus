import * as React from "react"
import Header from "../header/header"
import Footer from "../footer/footer"
import './layout.module.scss'

const Layout = ({ children }) => {
  return (
    <>
      <Header />
        <main>{children}</main>
        <Footer />
    </>
  )
}

export default Layout
