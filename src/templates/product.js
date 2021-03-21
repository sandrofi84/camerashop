import React, { useEffect, useState} from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'

import SEO from "../components/seo"
import Axios from 'axios'
import ProductAvailabilityTag from '../components/productAvailabilityTag'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import ImageCarousel from '../components/imageCarousel'
import AddToCartButton from '../components/addToCartButton'

const ProductTemplate = ({data}) => {

    const product = data.contentfulProduct;
    const site = data.site;
    const richText = product.features ? JSON.parse(product.features.raw) : null

    const [availability, setAvailability] = useState();
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(product.mainImage.fluid)

    useEffect(() => {

      const myRequest = Axios.CancelToken.source();
      // Call serverless function to get stock from Snipcart API
      getSingleStock()

      async function getSingleStock() {
          try {
              const response = await Axios.post(`https://camerashop.vercel.app/api/get-stock`, {productId: product.id}, { cancelToken: myRequest.token })

              if (response.data || response.data === 0) {
                console.log(response.data);
                  setAvailability(response.data)
                  setLoading(false)
              }
          } catch(err) {
              console.log(err);
              setAvailability(0)
              setLoading(false)
          }
      }

      return () => {
          myRequest.cancel();
      }
  }, [product.id])

    return (
        <>
            <SEO title={product.productName} />
            <div className="product-page__container">

              <div className="product-page__section-left bg--lightGrey">

                <div className="product-page__images-container">
                  <ImageCarousel mainImage={product.mainImage} otherImages={product.otherImages} setSelectedImage={setSelectedImage} />
                  <Img style={{width: "100%", height: "350px"}} fluid={selectedImage} />
                </div>
              
              </div>

              <div className="product-page__section-right">
              <h1 className="product__name color--purple">{product.productName}</h1>                
                <hr />

                <div className="product__description">{product.description.description}</div>
                {product.features && <hr />}
                {product.features && <div className="product__features">{documentToReactComponents(richText)}</div>}
              
              </div>

            </div>
            <div className="product-page__summary-box">
              <Img style={{width: "130px", minWidth: "130px", height: "100px"}} fluid={product.mainImage.fluid} />
              <h3 className="product-page__name color--white">{product.productName}</h3>
              <div className="product-page__availability bg--white">{loading ? <div className="lds-ring"><div></div><div></div><div></div><div></div></div> : <ProductAvailabilityTag availability={availability} setBoxShadow={null} />}</div>
              <h2 className="product-page__price"><span className={product.discountPrice && "product-page__price--discount"}>£{product.price}</span> {product.discountPrice && <span>£{product.discountPrice}</span>}</h2>
              <AddToCartButton product={product} availability={availability} loading={loading} siteUrl={site.siteMetadata.siteUrl} />    
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
          id
          fixed(width: 60) {
            ...GatsbyContentfulFixed
          }
        }
        make {
          makeName
        }
        otherImages {
          fluid(maxWidth: 800) {
              ...GatsbyContentfulFluid
          }
          id
          fixed(width: 60) {
            ...GatsbyContentfulFixed
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
