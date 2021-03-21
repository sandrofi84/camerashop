import React, { useContext, useEffect } from 'react'
import {graphql} from 'gatsby'

import SEO from "../components/seo"
import FilterTool from "../components/filterTool"

import ShopPool from "../components/shopPool"
import StateContext from "../context/stateContext"
import DispatchContext from '../context/dispatchContext'

const ShopTemplate = ({data}) => {
    const appState = useContext(StateContext);
    const appDispatch = useContext(DispatchContext);
    const products = data.allProducts.edges;
    const categories = data.allCategories.edges;
    const makes = data.allMakes.edges;
    const site = data.site;

    useEffect(() => {
      if (!appState.products) {
        appDispatch({type: "setProducts", products: products})
      }
    }, [products, appDispatch, appState.products])

    return (

        <>
            <SEO title="Shop" />

            <div className="shop bg--lightGrey">
              <FilterTool products={products} categories={categories} makes={makes} />
              <ShopPool products={appState.filteredProducts ? appState.filteredProducts : products} siteUrl={site.siteMetadata.siteUrl} />
            </div>
            
        </>
       
    )
}

export default ShopTemplate

export const shopPageQuery = graphql`
query ShopPageQuery {
    allProducts: allContentfulProduct(sort: {order: DESC, fields: dateAdded}) {
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
    allMakes: allContentfulMake {
      edges {
        node {
          makeName
          id
        }
      }
    }
}
`

