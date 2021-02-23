import React from 'react'
import {Link} from 'gatsby'
import Img from 'gatsby-image'
import { useState, useEffect } from 'react'

import ProductCounter from '../components/productCounter'


const ProductCard = ({product, site, stock}) => {
    const [availability, setAvailability] = useState();
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);

    const saleTagStyle = product.discountPrice ? {display: "block"} : {display: "none"}
    
    useEffect(() => {
        if (stock) {
            const updatedAvailability = stock.filter(item => item.id === product.id)[0].stock
            setAvailability(updatedAvailability)
            setLoading(false)
        }
    }, [stock, product])
    
    return (
        <div className="shop__product bg--white">
            <div style={saleTagStyle} className="shop__product__sale-tag color--white bg--orange">SALE!</div>
            <Img style={{width: "100%", height: "250px"}} imgStyle={{objectFit: "contain"}} fluid={product.mainImage.fluid} />
            <div className="shop__product__text">
                <h3 className="shop__product__name"><Link to={`/shop/${product.slug}/`} >{product.productName}</Link></h3>
                <div className="shop__product__description">{product.shortDescription}</div>
                <div className="shop__product__availability">{loading ? <div className="lds-ring"><div></div><div></div><div></div><div></div></div> : availability === 0 ? <span style={{color: "red"}}>Out of stock</span> : <span style={{color: "green"}}>{availability} items available</span>}</div>
                <p className="shop__product__price"><span className={product.discountPrice && "shop__product__price--discount"}>£{product.price}</span> {product.discountPrice && <span>£{product.discountPrice}</span>}</p>
            </div>
            <div className={"shop__product__button-container" + (loading || availability === 0 ? " shop__product__button-container--disabled" : "")}>
                <button 
                    className={`snipcart-add-item btn btn--shop-product`}
                    data-item-id={product.id}
                    data-item-name={product.productName}
                    data-item-image={product.mainImage.fluid.src}
                    data-item-description={product.shortDescription}
                    data-item-price={product.discountPrice ? product.discountPrice : product.price}
                    data-item-url={`${site}/shop/${product.slug}/`}
                    data-item-quantity={quantity}
                    data-item-max-quantity={availability}

                    disabled={loading || availability === 0}
                >
                    Add to Cart
                </button>
                {availability > 0 && <ProductCounter count={quantity} setCount={setQuantity} max={availability} />}
            </div>

        </div>
    )
}

export default ProductCard
