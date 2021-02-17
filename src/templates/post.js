import React from 'react'
import { graphql } from 'gatsby'
import Img from "gatsby-image"

import SEO from "../components/seo"

import { BLOCKS } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';


const Post = ({data}) => {

    const post = data.post;

    const richText = JSON.parse(post.body.raw)

    let options = {
      renderNode: {
        [BLOCKS.EMBEDDED_ASSET]: (node) => {
          let assetArray = post.body.references.filter(asset => asset.contentful_id === node.data.target.sys.id)

          return <Img fluid={assetArray[0].fluid} />;
        }
      }
    }

    return (
        <>
            <SEO title={post.title} />
            <div>
                <Img fluid={post.featureImage.fluid} />
                <h1>{post.title}</h1>
                <div>{documentToReactComponents(richText, options)}</div>
            </div>
        </>
        
    )
}

export default Post

export const postPageQuery = graphql`
query SinglePostQuery($id: String!) {  
  post: contentfulBlogPost(id: {eq: $id}) {
    dateAdded(formatString: "DD-MM-YY")
    imageCredit
    slug
    title
    author {
      name
    }
    body {
      raw
      references {
        ... on ContentfulAsset {
          contentful_id
          fluid(maxWidth: 600) {
            ...GatsbyContentfulFluid_withWebp
          }
        }
      }
    }
    featureImage {
      fluid(maxWidth: 1920) {
        ...GatsbyContentfulFluid
      }
    }
  }
}
`
