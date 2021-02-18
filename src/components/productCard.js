import React from 'react'
import {Link} from 'gatsby'
import Img from 'gatsby-image'


const ProductCard = ({product, site, stock}) => {
    
    return (
        <div className="shop__product">
            <Img style={{width: "300px", height: "250px"}} fluid={product.mainImage.fluid} />
            <h3><Link to={`/shop/${product.slug}/`} >{product.productName}</Link></h3>
            <div>{product.shortDescription}</div>
            <div>Availability: {!stock ? <div className="lds-ring"><div></div><div></div><div></div><div></div></div> : <span>{stock.filter(item => item.id === product.id)[0].stock}</span> }</div>
            <p className={`shop__product__price${product.discountPrice ? " shop__product__price--discount" : ""}`}>£{product.price}</p>
            {product.discountPrice ? <p>Discount Price: £{product.discountPrice}</p> : null}
            <button 
                className={`snipcart-add-item btn btn--shop-product`}
                data-item-id={product.id}
                data-item-name={product.productName}
                data-item-image={product.mainImage.fluid.src}
                data-item-description={product.shortDescription}
                data-item-price={product.discountPrice ? product.discountPrice : product.price}
                data-item-url={`${site}/shop/${product.slug}/`}
            >
                Add to Cart
            </button>

        </div>
    )
}

export default ProductCard
