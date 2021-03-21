import React from 'react'

const ProductAvailabilityTag = ({availability, setBoxShadow}) => {
    if (availability <= 0) {
        // if (setBoxShadow) {setBoxShadow("0px 0px 2px red")}
        return <span style={{color: "red"}}>Out of stock</span>
    } else if (availability === 1) {
        // if (setBoxShadow) {setBoxShadow("0px 0px 2px orange")}
        return <span style={{color: "orange"}}>Only 1 item left!</span>
    } else if (availability > 1 && availability < 5) {
        // if (setBoxShadow) {setBoxShadow("0px 0px 2px orange")}
        return <span style={{color: "orange"}}>Only {availability} items left!</span>
    }
    // if (setBoxShadow) {setBoxShadow("0px 0px 2px green")}
    return <span style={{color: "green"}}>{availability} items available</span>
}

export default ProductAvailabilityTag
