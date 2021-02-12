import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"


const MainImage = () => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "Photo_by_Derice_Jason_Fahnkow_from_Pexels_1920.png" }) {
        childImageSharp {
          fluid(maxWidth: 1920, duotone: { highlight: "#de34eb", shadow: "#4600b0"}) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  if (!data?.placeholderImage?.childImageSharp?.fluid) {
    return <div>Picture not found</div>
  }

  return <Img style={{position: "relative", top: "2px", width: "100%", height: "max-content"}} imgStyle={{height: "auto", width: "100%"}} loading="eager" fluid={data.placeholderImage.childImageSharp.fluid} />
}

export default MainImage
