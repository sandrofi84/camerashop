import React from 'react'
import Img from 'gatsby-image'
import { Link } from 'gatsby'

const PostCard = ({post}) => {
    const {title, dateAdded, excerpt, slug, featureImage} = post
    return (
        <div className="post__card">
            <div className="post__card__picture">
                <Img style={{width: "100%", height: "450px"}} imgStyle={{width: "100%", height: "100%", objectFit: "cover"}} fluid={featureImage.fluid} />
            </div>
            <div className="post__card__text">
                <h3 className="post__card__text-title">{title}</h3>
                <div className="post__card__text-excerpt">{excerpt}</div>
                <small className="post__card__text-date">{dateAdded}</small>
                <Link to={`/blog/${slug}/`} className="post__card__text-link color--orange" >Read More</Link>
            </div>
            
        </div>
    )
}

export default PostCard
