import React from 'react'
import { Link } from 'gatsby'
import Img from "gatsby-image"

const servicesCard = ({image, serviceInfo}) => {




    return (
        <div className="services__card">
          <div className="services__card__picture-frame">
              <Img style={{height: "300px", width:"250px", transform: "scale(1.5) translateY(-10px)"}} imgStyle={{objectFit: "contain"}} fluid={image} />
          </div>
          <div className="services__card__text">
              <h3 className="services__card__text-title color--orange">{serviceInfo.title}</h3>
              <p className="services__card__text-sub color--purple">{serviceInfo.text}</p>

              <Link to={serviceInfo.url} className="btn btn--services">Learn More</Link>
          </div>
        </div>
    )
}

export default servicesCard