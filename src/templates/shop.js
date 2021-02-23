import React, { useState } from 'react'
import {graphql} from 'gatsby'

import SEO from "../components/seo"
import FilterTool from "../components/filterTool"
import ShopPool from "../components/shopPool"

const ShopTemplate = ({data}) => {
    const [filteredProducts, setFilteredProducts] = useState();
    const products = data.allProducts.edges;
    const categories = data.allCategories.edges;
    const site = data.site;

    return (

        <>
            <SEO title="Shop" />
            <FilterTool categories={categories} products={products} setFilteredProducts={setFilteredProducts} />
            <div className="shop bg--lightGrey">
              <div className="shop__head-section">
                  <h1 className="shop__head-section__title">SHOP</h1>
              </div>
              <div className="wrapper">
                  <ShopPool products={filteredProducts ? filteredProducts : products} site={site.siteMetadata.siteUrl} />
              </div>
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
    allCategories: allContentfulCategory {
      edges {
        node {
          categoryName
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

