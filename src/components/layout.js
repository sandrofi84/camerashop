
import React from "react"

import Header from "./header"
import "../styles/layout.css"

const Layout = ({ children }) => {

  return (
    <>
      <Header/>
      <main>{children}</main>
      <footer className="footer bg--grey color--white"/>
    </>
  )
}

export default Layout
