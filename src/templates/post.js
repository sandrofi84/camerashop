import React from 'react'
import { graphql, Link } from 'gatsby'

import Layout from "../components/layout"
import SEO from "../components/seo"

const Post = ({data}) => {

    const post = data.wpPost;

    return (
        <Layout>
            <SEO title={post.title} />
            <div>
                <h1>{post.title}</h1>
                <div dangerouslySetInnerHTML={{__html:post.content}} />
            </div>
            <Link to="/">Go to HOME page</Link>
            <Link to="/about/">Go to ABOUT page</Link>
            <Link to="/blog/">Go to BLOG page</Link>
        </Layout>
        
    )
}

export default Post

export const postPageQuery = graphql`
query SinglePostQuery($id: String!) {
    wpPost(id: {eq: $id}) {
      id
      title
      slug
      featuredImage {
        node {
          localFile {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
          date
          author {
            node {
              name
            }
          }
        }
      }
      content
    }
}
`
