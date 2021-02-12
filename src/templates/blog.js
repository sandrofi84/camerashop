import React from 'react'
import {graphql, Link} from 'gatsby'
import Img from 'gatsby-image'

import Layout from "../components/layout"
import SEO from "../components/seo"

const BlogTemplate = ({data}) => {
    const posts = data.allWpPost.edges;

    return (

        <Layout>
            <SEO title="Blog" />
            <div>
                {
                    posts.map(post => (
                    <div>
                        <h3><Link to={`/blog/${post.node.slug}`} >{post.node.title}</Link></h3>
                        <Img fixed={post.node.featuredImage.node.localFile.childImageSharp.fixed} />
                        <div dangerouslySetInnerHTML={{__html: post.node.excerpt}}></div>
                    </div>
                    
                    ))
                }
            </div>
            <Link to="/">Go to HOME page</Link>
            <Link to="/about/">Go to ABOUT page</Link>
        </Layout>
       
    )
}

export default BlogTemplate

export const blogPageQuery = graphql`
query allPostsQuery {
    allWpPost {
      edges {
        node {
          slug
          title
          excerpt
          featuredImage {
            node {
              mediaItemUrl
              localFile {
                childImageSharp {
                  fixed(width: 300) {
                    ...GatsbyImageSharpFixed
                  }
                }
              }
            }
          }
        }
      }
    }
}
`

