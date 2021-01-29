import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const HomePage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>HOME</h1>
    <Link to="/about/">Go to ABOUT page</Link>
  </Layout>
)

export default HomePage
