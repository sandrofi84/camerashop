import React from 'react'

const ProductCounter = ({count, setCount, max}) => {


    return (
        <div className="product__counter">
            <button style={count === 1 ? {opacity: ".3"} : {}} onClick={() => {
                if (count > 1) {
                    setCount(count-1)
                }
            }} className="product__counter__minus">-</button>
            <div className="product__counter__count">{count}</div>
            <button style={count === max ? {opacity: ".3"} : {}} onClick={() => {
                if (count < max) {
                    setCount(count+1)
                }
            }} className="product__counter__plus">+</button>
            
        </div>
    )
}

export default ProductCounter
