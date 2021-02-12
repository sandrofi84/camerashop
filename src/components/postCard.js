import React from 'react'
import Img from 'gatsby-image'
import { Link } from 'gatsby'

const PostCard = ({post}) => {
    const {title, date, excerpt, slug, featuredImage} = post
    return (
        <div className="post__card">
            <div className="post__card__picture">
                <Img style={{width: "100%", height: "450px"}} imgStyle={{width: "100%", height: "100%", objectFit: "cover"}} fluid={featuredImage.node.localFile.childImageSharp.fluid} />
            </div>
            <div className="post__card__text">
                <h3 className="post__card__text-title">{title}</h3>
                <div dangerouslySetInnerHTML={{__html: excerpt}} className="post__card__text-excerpt"></div>
                <small className="post__card__text-date">{date}</small>
                <Link to={`/blog/${slug}/`} className="post__card__text-link color--orange" >Read More</Link>
            </div>
            
        </div>
    )
}

export default PostCard
