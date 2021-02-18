import React from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'

import SEO from "../components/seo"

const ProductTemplate = ({data}) => {

    const product = data.contentfulProduct;
    const site = data.site;

    return (
        <>
            <SEO title={product.productName} />
            <div>
                <Img style={{width: "450px", height: "350px"}} fluid={product.mainImage.fluid} />
                <h1>{product.productName}</h1>
                <div>{product.description.description}</div>
                <button 
                    className={`snipcart-add-item btn btn--shop-product`}
                    data-item-id={product.id}
                    data-item-name={product.productName}
                    data-item-image={product.mainImage.fluid.src}
                    data-item-description={product.shortDescription}
                    data-item-price={product.discountPrice ? product.discountPrice : product.price}
                    data-item-url={`${site.siteMetadata.siteUrl}/shop/${product.slug}/`}
                >
                    Add to Cart
                </button>
            </div>
            <Link to="/">Go to HOME page</Link>
            <Link to="/about/">Go to ABOUT page</Link>
            <Link to="/blog/">Go to BLOG page</Link>
        </>
        
    )
}

export default ProductTemplate

export const productPageQuery = graphql`
query SingleProductQuery($id: String!) {
    contentfulProduct(id: {eq: $id}) {
        category {
          categoryName
        }
        condition {
          conditionType
        }
        dateAdded
        description {
          description
        }
        discountPrice
        features {
          raw
        }
        id
        mainImage {
          fluid(maxWidth: 800) {
            ...GatsbyContentfulFluid
            }
        }
        make {
          makeName
        }
        otherImages {
          fluid(maxWidth: 800) {
              ...GatsbyContentfulFluid
          }
        }
        price
        productName
        shortDescription
        size
        slug
    }
    site {
      siteMetadata {
        siteUrl
      }
    }
}
`
