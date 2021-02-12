
import React from "react"

import Header from "./header"
import "../styles/layout.css"

const Layout = ({ children }) => {

  return (
    <>
      <Header/>
      <div>
        <main>{children}</main>
        <footer className="footer bg--grey color--white">
        </footer>
      </div>
    </>
  )
}

export default Layout
