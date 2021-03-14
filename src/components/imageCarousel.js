import React, { useState } from 'react'

import Img from 'gatsby-image'

const ImageCarousel = ({mainImage, otherImages, setSelectedImage}) => {
    const [active, setActive] = useState(mainImage.id)

    function handleMouseEnter(image) {
        setSelectedImage(image.fluid)
        setActive(image.id)
    }

    const activeStyle = {border: "2px solid rgba(252, 124, 60, 1)"}
    
    return (
        <ul className="image-carousel__column">
            <li onMouseEnter={() => handleMouseEnter(mainImage)} role="presentation" style={active === mainImage.id ? activeStyle : {}} className="image-carousel__thumbnail">
                <Img style={{width: "100%", height: "100%"}} imgStyle={{objectFit: "cover"}} fixed={mainImage.fixed}/>
            </li>
            {
                otherImages.map(image => (
                <li key={image.id} onMouseEnter={() => handleMouseEnter(image)} role="presentation" style={active === image.id ? activeStyle : {}} className="image-carousel__thumbnail">
                    <Img style={{width: "100%", height: "100%"}} imgStyle={{objectFit: "cover"}} fixed={image.fixed} />
                </li>
                ))
            }
        </ul>
    )
}

export default ImageCarousel
