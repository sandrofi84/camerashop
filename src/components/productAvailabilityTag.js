import React from 'react'

const ProductAvailabilityTag = ({availability}) => {
    if (availability <= 0) {
        return <span style={{color: "red"}}>Out of stock</span>
    } else if (availability === 1) {
        return <span style={{color: "orange"}}>Only 1 item left!</span>
    } else if (availability > 1 && availability < 5) {
        return <span style={{color: "orange"}}>Only {availability} items left!</span>
    }

    return <span style={{color: "green"}}>{availability} items available</span>
}

export default ProductAvailabilityTag
