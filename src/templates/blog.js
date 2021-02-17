import React from 'react'
import {graphql, Link} from 'gatsby'
import Img from 'gatsby-image'

import SEO from "../components/seo"

const BlogTemplate = ({data}) => {
    const posts = data.allPosts.edges;

    return (

        <>
            <SEO title="Blog" />
            <div className="wrapper wrapper--vertical">
              <h1 className="blog__title">Blog</h1>
                {
                    posts.map(post => (
                    <div key={post.node.id}>
                        <h3><Link to={`/blog/${post.node.slug}`} >{post.node.title}</Link></h3>
                        <Img fixed={post.node.featureImage.fixed} />
                        <div>{post.node.excerpt}</div>
                    </div>
                    
                    ))
                }
            </div>

        </>
       
    )
}

export default BlogTemplate

export const blogPageQuery = graphql`
query allPostsQuery {
  allPosts: allContentfulBlogPost(sort: {order: DESC, fields: dateAdded}) {
    edges {
      node {
        id
        slug
        title
        excerpt
        dateAdded(formatString: "DD-MM-YY HH:MM")
        featureImage {
          fixed(width: 800) {
            ...GatsbyContentfulFixed_withWebp
          }
        }
      }
    }
  }
}
`

