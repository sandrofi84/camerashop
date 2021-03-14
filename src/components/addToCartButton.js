import React, { useState } from 'react'
import ProductCounter from '../components/productCounter'

const AddToCartButton = ({product, loading, availability, siteUrl, centered}) => {
    const [quantity, setQuantity] = useState(1);

    return (
        <div style={centered ? {marginLeft: "auto", marginRight: "auto"} : {}} className={"shop__product__button-container" + (loading || availability === 0 ? " shop__product__button-container--disabled" : "")}>
            <button 
                className={`snipcart-add-item btn btn--shop-product`}
                data-item-id={product.id}
                data-item-name={product.productName}
                data-item-image={product.mainImage.fluid.src}
                data-item-description={product.shortDescription}
                data-item-price={product.discountPrice ? product.discountPrice : product.price}
                data-item-url={`${siteUrl}/shop/${product.slug}/`}
                data-item-quantity={quantity}
                data-item-max-quantity={availability}

                disabled={loading || availability === 0}
            >
                Add to Cart
            </button>
            {availability > 0 && <ProductCounter count={quantity} setCount={setQuantity} max={availability} />}
        </div>
    )
}

export default AddToCartButton
