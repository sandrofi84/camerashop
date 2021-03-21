import React from 'react'
import { graphql } from 'gatsby'

import SEO from "../components/seo"
import PostCard from "../components/postCard"

const BlogTemplate = ({data}) => {
    const posts = data.allPosts.edges;

    return (

        <>
            <SEO title="Blog" />
            <div className="blog bg--purple">
              <div className="wrapper wrapper--vertical">
                <h1 className="blog__title color--white">Blog</h1>
                <div className="blog__pool">
                  {
                      posts.map(post => (
                        <PostCard key={post.node.id} post={post.node} />
                      ))
                  }
                </div>
              </div>
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
          fluid(maxWidth: 800) {
            ...GatsbyContentfulFluid_withWebp
          }
        }
      }
    }
  }
}
`

