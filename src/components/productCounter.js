import React from 'react'

const ProductCounter = ({count, setCount, max}) => {


    return (
        <div className="product__counter">
            <div style={count === 1 ? {opacity: ".3"} : {}} onClick={() => {
                if (count > 1) {
                    setCount(count-1)
                }
            }} className="product__counter__minus">-</div>
            <div className="product__counter__count">{count}</div>
            <div style={count === max ? {opacity: ".3"} : {}} onClick={() => {
                if (count < max) {
                    setCount(count+1)
                }
            }} className="product__counter__plus">+</div>
            
        </div>
    )
}

export default ProductCounter
