import React from 'react'
import {graphql} from 'gatsby'

import SEO from "../components/seo"
import ShopPool from "../components/shopPool"

const ShopTemplate = ({data}) => {
    const products = data.allProducts.edges;
    const site = data.site;

    return (

        <>
            <SEO title="Shop" />
            <div className="shop__menu color--white">
                <div>Shop All</div>
                <div>Cameras</div>
                <div>Lenses</div>
                <div>Accessories</div>
            </div>
            <div className="shop__head-section">
                <h1 className="shop__head-section__title">SHOP</h1>
            </div>
            <div className="wrapper">
                <ShopPool products={products} site={site.siteMetadata.siteUrl} />
            </div>
            
        </>
       
    )
}

export default ShopTemplate

export const shopPageQuery = graphql`
query ShopPageQuery {
    allProducts: allContentfulProduct {
      edges {
        node {
          productName
          price
          discountPrice
          category {
            categoryName
          }
          id
          mainImage {
            fluid(maxWidth: 800) {
                ...GatsbyContentfulFluid
            }
          }
          dateAdded
          make {
            makeName
          }
          shortDescription
          slug
          condition {
            conditionType
          }
        }
      }
    }
    site {
      siteMetadata {
        siteUrl
      }
    }
}
`

