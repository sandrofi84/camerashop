
import React from "react"

import Header from "./header"
import "../styles/layout.css"

const Layout = ({ children }) => {

  return (
    <>
      <Header/>
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0 1.0875rem 1.45rem`,
        }}
      >
        <main>{children}</main>
        <footer
          style={{
            marginTop: `2rem`,
          }}
        >
        </footer>
      </div>
    </>
  )
}

export default Layout
