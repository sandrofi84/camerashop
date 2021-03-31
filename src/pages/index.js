import React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import { AnchorLink } from "gatsby-plugin-anchor-links"

import SEO from "../components/seo"

import ServicesImage from "../components/servicesImage"
import ServicesPool from "../components/servicesPool"
import HeroImage from "../components/heroImage"
import BuyImage from "../components/buyImage"
import PostCard from "../components/postCard"

const HomePage = () => {
const data = useStaticQuery(graphql`
  query RecentPostsQuery {
    recentPosts: allContentfulBlogPost(limit: 4, sort: {order: DESC, fields: dateAdded}) {
      edges {
        node {
          id
          slug
          title
          excerpt
          dateAdded(formatString: "DD-MM-YY HH:MM")
          featureImage {
            fluid(maxWidth: 800) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
        }
      }
    }
 }
`)


  const recentPosts = data ? data.recentPosts.edges : null;
  
  return (

  <>
    <SEO title="Home" />
      <HeroImage />
      <div className="layer-screen layer-screen--white"></div>
      <div className="layer-screen layer-screen--black"></div>
      <div className="layer-geometry">
        <div className="layer-geometry__square" data-sal="slide-left" data-sal-duration="1000" data-sal-easing="ease-out"></div>
        <div className="layer-geometry__square-2 bg--orange" data-sal="slide-up" data-sal-duration="1000" data-sal-easing="ease-out"></div>
        <div className="layer-geometry__square-3 bg--purple" data-sal="slide-right" data-sal-duration="1000" data-sal-easing="ease-out"></div>
        <div className="layer-geometry__square-4" data-sal="slide-down" data-sal-duration="1000" data-sal-easing="ease-out"></div>
      </div>
      <div className="wrapper">
        <section className="main">
          <div className="main__text" data-sal="fade" data-sal-delay="500" data-sal-duration="700" data-sal-easing="ease-out">
            <h1 className="main__text-title">The Best Camera Service on the Web.</h1>
            <p className="main__text-subtitle">Whether you are <span className="color--orange">selling</span> or <span className="color--orange">buying</span> camera gear,<br/> we have many options for you.</p>
            <AnchorLink to="/#sell" className="btn btn--main">Our Services</AnchorLink>
          </div>

        </section>

        <section id="sell" className="evaluation">
          <div className="evaluation__container">
            <form className="form bg--orange color--white" data-sal="slide-right" data-sal-duration="700" data-sal-easing="ease-out">
              <h2 className="">Free Evaluation</h2>
              <div className="form-group">
                <div className="form-subgroup">
                  <label htmlFor="fn">First Name</label>
                  <input type="text" name="firstName" id="fn"/>
                </div>
                
                <div className="form-subgroup">
                  <label htmlFor="ln">Last Name</label>
                  <input type="text" name="lastName" id="ln"/>
                </div>
              </div>

              <div className="form-group">
                <div className="form-subgroup">
                  <label htmlFor="email">Email</label>
                  <input type="email" name="email" id="email"/>
                </div>
                
                <div className="form-subgroup">
                  <label htmlFor="confEmail">Confirm Email</label>
                  <input type="email" name="confirmEmail" id="confEmail"/>
                </div>
              </div> 

              <div className="form-group">
                <label htmlFor="make">Camera or Lens Make</label>
                <select name="make" id="make">
                  <option value="nikon">Nikon</option>
                  <option value="canon">Canon</option>
                  <option value="sony">Sony</option>
                  <option value="fujifilm">Fujifilm</option>
                  <option value="gopro">GoPron</option>
                </select>
              </div>
            
              <div className="form-group">
                <label htmlFor="model">Camera or Lens Model</label>
                <input type="text" name="model" id="model"/>
              </div>
              
              <div className="form-group">
                <label htmlFor="addInfo">Additional Information</label>
                <textarea name="addInfo" id="addInfo" cols="35" rows="5"></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="gdpr">GDPR Agreement</label>
                <input type="checkbox" name="gdpr" id="gdpr"/>
                <small>I consent to having this website store my submitted<br/>information so they can respond to my inquiry.</small>
              </div>

              <button className="btn btn--form">Submit</button>
            </form>

            <div className="evaluation__text">
              <h1 className="evaluation__text-title color--purple">Sell Your Camera Gear</h1>
              <p className="evaluation__text-sub color--purple">We love Used Camera Gear here at CameraFlips. But we love even more helping you transform that old digital camera sitting in a drawer into a few – sometimes hundreds – pounds.</p>
              <h3 className="evaluation__text-cta color--orange">Tell us what you have and we will give you a quote within 24 hours.</h3>
            </div>
          </div>

        </section>

        <section className="buy">
            <div className="buy__container">

              <div className="buy__text">
                <h1 className="buy__text-title color--white">Buy Camera Gear</h1>
                <p className="buy__text-sub color--white">Are you looking for new or used camera gear?</p>
                <h3 className="buy__text-cta color--orange">Your search is over. Visit our shop now!</h3>
                <Link to="/shop/" className="btn btn--buy">Shop</Link>
              </div>

              <div className="buy__picture" data-sal="slide-left" data-sal-duration="700" data-sal-easing="ease-out">
                <BuyImage />
              </div>

            </div>
            
        </section>
      </div>

    <section className="services">
      <div className="services__BG">
        <h1 className="services__title color--purple">We also offer</h1>
        <ServicesPool />
        <ServicesImage />
      </div>
    </section>

    <section className="recent-posts bg--purple">
      <h1 className="recent-posts__title color--white">Recent Blog Posts</h1>
      <div className="recent-posts__pool">
      { 
        recentPosts ? recentPosts.map(post => <PostCard key={post.node.id} post={post.node} />) : <p>No recent posts</p>
      }
      </div>
    </section>

    <div className="plife">
      <h1 className="plife__title color--white">A Life in Photos</h1>
      <div className="plife__container">
        <iframe className="plife__video" title="A Photographer's Life" allowFullScreen="1" id="widget2" width="640" height="360" frameBorder="0"></iframe>
      </div>
      
    </div>
   
  </>
  )
}

export default HomePage
