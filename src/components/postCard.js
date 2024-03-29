import React from 'react'
import Img from 'gatsby-image'
import { Link } from 'gatsby'

const PostCard = ({post}) => {
    const {title, dateAdded, excerpt, slug, featureImage} = post
    return (
        <div className="post__card" data-sal="slide-up" data-sal-duration="700" data-sal-easing="ease-out">
            <div className="post__card__picture">
                <Img style={{height: "100%"}} imgStyle={{height: "100%"}} fluid={featureImage.fluid} />
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
