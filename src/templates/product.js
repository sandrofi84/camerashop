import React, { useEffect, useState} from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'

import SEO from "../components/seo"
import Axios from 'axios'
import ProductCounter from '../components/productCounter'
import ProductAvailabilityTag from '../components/productAvailabilityTag'

const ProductTemplate = ({data}) => {

    const product = data.contentfulProduct;
    const site = data.site;

    const [availability, setAvailability] = useState();
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

      const myRequest = Axios.CancelToken.source();
      // Call serverless function to get stock from Snipcart API
      getSingleStock()

      async function getSingleStock() {
          try {
              const response = await Axios.post(`https://camerashop.vercel.app/api/get-stock`, {productId: product.id}, { cancelToken: myRequest.token })

              if (response.data) {
                console.log(response.data);
                  setAvailability(response.data)
                  setLoading(false)
              }
          } catch(err) {
              console.log(err);
          }
      }

      return () => {
          myRequest.cancel();
      }
  }, [product.id])

    return (
        <>
            <SEO title={product.productName} />
            <div>
                <Img style={{width: "450px", height: "350px"}} fluid={product.mainImage.fluid} />
                <h1>{product.productName}</h1>
                <div>{product.description.description}</div>
                <div className="shop__product__availability">{loading ? <div className="lds-ring"><div></div><div></div><div></div><div></div></div> : <ProductAvailabilityTag availability={availability} />}</div>
                <div className={"shop__product__button-container" + (loading || availability === 0 ? " shop__product__button-container--disabled" : "")}>
                  <button 
                      className={`snipcart-add-item btn btn--shop-product`}
                      data-item-id={product.id}
                      data-item-name={product.productName}
                      data-item-image={product.mainImage.fluid.src}
                      data-item-description={product.shortDescription}
                      data-item-price={product.discountPrice ? product.discountPrice : product.price}
                      data-item-url={`${site.siteMetadata.siteUrl}/shop/${product.slug}/`}
                      data-item-quantity={quantity}
                      data-item-max-quantity={availability}

                      disabled={loading || availability === 0}
                  >
                      Add to Cart
                  </button>
                  {availability > 0 && <ProductCounter count={quantity} setCount={setQuantity} max={availability} />}
                </div>
            </div>
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
