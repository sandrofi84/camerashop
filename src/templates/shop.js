import React from 'react'
import {graphql, Link} from 'gatsby'
import Img from 'gatsby-image'

import SEO from "../components/seo"

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
                <div className="shop__pool">
                    {
                        products.map(product => (
                        <div key={product.node.id} className="shop__product">
                            <Img style={{width: "300px", height: "250px"}} fluid={product.node.mainImage.fluid} />
                            <h3><Link to={`/shop/${product.node.slug}/`} >{product.node.productName}</Link></h3>
                            <div>{product.node.shortDescription}</div>
                            <p className={`shop__product__price${product.node.discountPrice ? " shop__product__price--discount" : ""}`}>£{product.node.price}</p>
                            {product.node.discountPrice ? <p>Discount Price: £{product.node.discountPrice}</p> : null}
                            <button 
                                className={`snipcart-add-item btn btn--shop-product`}
                                data-item-id={product.node.id}
                                data-item-name={product.node.productName}
                                data-item-image={product.node.mainImage.fluid.src}
                                data-item-description={product.node.shortDescription}
                                data-item-price={product.node.discountPrice ? product.node.discountPrice : product.node.price}
                                data-item-url={`${site.siteMetadata.siteUrl}/shop/${product.node.slug}/`}
                            >
                                Add to Cart
                            </button>

                        </div>
                        
                        ))
                    }
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
    site {

        siteMetadata {
  
          siteUrl
  
        }
  
      }
}
`

