import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"


const HeroImage = () => {
  const data = useStaticQuery(graphql`
    query {
      mobile: file(relativePath: {eq: "Main-Photo_by_Mengliu_Di_from_Pexels-mob.jpg"}) {
        childImageSharp {
          fluid(maxWidth: 500, quality: 75) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
      desktop: file(relativePath: {eq: "Main-Photo_by_Mengliu_Di_from_Pexels-desktop.jpg"}) {
        childImageSharp {
          fluid(maxWidth: 1920, quality: 75) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      
    }
  `)

  const sources = [
    {
      ...data.mobile.childImageSharp.fluid,
      media: `(max-width: 499px)`
    },
    {
      ...data.desktop.childImageSharp.fluid,
      media: `(min-width: 500px)`
    }
  ]

  if (!data?.mobile?.childImageSharp?.fluid || !data?.desktop?.childImageSharp?.fluid) {
    return <div>Picture not found</div>
  }

  const style = {width: "100%", height: "100%"}
  const imgStyle = {objectPosition: "50% 0%"}

  return <Img style={style} imgStyle={imgStyle} loading="eager" fluid={sources} />
}

export default HeroImage
