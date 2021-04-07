import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"


const HeroImage = () => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "Main-Photo_by_Mengliu_Di_from_Pexels_vertical.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1920) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  if (!data?.placeholderImage?.childImageSharp?.fluid) {
    return <div>Picture not found</div>
  }

  const style = {height: "100%"}
  const imgStyle = {objectPosition: "50% 0%"}

  return <Img style={style} imgStyle={imgStyle} loading="eager" fluid={data.placeholderImage.childImageSharp.fluid} />
}

export default HeroImage
