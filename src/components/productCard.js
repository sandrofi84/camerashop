import React from 'react'
import {Link} from 'gatsby'
import Img from 'gatsby-image'
import { useState, useEffect } from 'react'

import ProductAvailabilityTag from '../components/productAvailabilityTag'
import AddToCartButton from '../components/addToCartButton'


const ProductCard = ({product, siteUrl, stock}) => {
    const [availability, setAvailability] = useState();
    const [loading, setLoading] = useState(true);

    const saleTagStyle = product.discountPrice ? {display: "block"} : {display: "none"}
    
    useEffect(() => {
        if (stock) {
            const filteredStock = stock.filter(item => item.id === product.id)
            if (filteredStock.length > 0) {
                setAvailability(filteredStock[0].stock)
                setLoading(false)
            } else {
                setAvailability(0)
                setLoading(false)
            }
        }
    }, [stock, product])
    
    return (
        <div className="shop__product bg--white">
            <div style={saleTagStyle} className="shop__product__sale-tag color--white bg--orange">SALE!</div>
            <Img style={{width: "100%", height: "250px"}} imgStyle={{objectFit: "contain"}} fluid={product.mainImage.fluid} />
            <div className="shop__product__text">
                <h3 className="shop__product__name"><Link to={`/shop/${product.slug}/`} >{product.productName}</Link></h3>
                <div className="shop__product__description">{product.shortDescription}</div>
                <div className="shop__product__availability">{loading ? <div className="lds-ring"><div></div><div></div><div></div><div></div></div> : <ProductAvailabilityTag availability={availability} />}</div>
                <p className="shop__product__price"><span className={product.discountPrice && "shop__product__price--discount"}>£{product.price}</span> {product.discountPrice && <span>£{product.discountPrice}</span>}</p>
            </div>
            <AddToCartButton product={product} availability={availability} loading={loading} siteUrl={siteUrl} centered={true} />

        </div>
    )
}

export default ProductCard
