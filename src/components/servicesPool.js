import React from 'react'
import {graphql, useStaticQuery} from 'gatsby'

import ServicesCard from './servicesCard'

const ServicesPool = () => {
    const consignment = {
      title: "Consignment Service",
      text: "You can send your camera gear to us and we will sell it on your behalf. We will only charge you a percentage of the sale price. No sale no fee!",
      url: "/"
    }
    const rent = {
      title: "Rent the Gear You Need",
      text: "If you need a second camera, an expensive lens or a microphone for just a project we can help via our partnership with FatLlama.",
      url: "/"
    }
    const data = useStaticQuery(graphql`
    query {
      consignment: file(relativePath: { eq: "Consignment_Photo_by_Sora_Shimazaki_from_Pexels_640px.png" }) {
        childImageSharp {
          fluid(maxWidth: 600, duotone: { highlight: "#ffffff", shadow: "#4600b0"}) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
      rent: file(relativePath: { eq: "Rent_Photo_by_Yender_Gonzalez_on_Unsplash_640px.png" }) {
        childImageSharp {
          fluid(maxWidth: 600, duotone: { highlight: "#ffffff", shadow: "#4600b0"}) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `)
    return (
        <div className="services__pool">
            <ServicesCard serviceInfo={consignment} image={data.consignment.childImageSharp.fluid} />
            <ServicesCard serviceInfo={rent} image={data.rent.childImageSharp.fluid} />
        </div>
    )
}

export default ServicesPool
