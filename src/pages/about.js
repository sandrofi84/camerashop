import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const AboutPage = () => {
  
  
  return (
    <Layout>
      <SEO title="About" />
      <h1>ABOUT PAGE</h1>
      <Link to="/">Go back to the homepage</Link>
      <Link to="/blog/">Go to BLOG page</Link>
    </Layout>
  )
}

export default AboutPage
