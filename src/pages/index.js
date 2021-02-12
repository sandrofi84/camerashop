import React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import ServicesImage from "../components/servicesImage"
import ServicesPool from "../components/servicesPool"
import HeroImage from "../components/heroImage"
import BuyImage from "../components/buyImage"
import PostCard from "../components/postCard"

const HomePage = () => {
  const data = useStaticQuery(graphql`
  query RecentPostsQuery {
    recentPosts: allWpPost(sort: {fields: date, order: DESC}, limit: 4) {
      edges {
        node {
          title
          date(formatString: "DD-MM-YYYY")
          excerpt
          id
          slug
          featuredImage {
            node {
              localFile {
                childImageSharp {
                  fluid {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  `)

  const recentPosts = data ? data.recentPosts.edges : null;
  
  return (

  <Layout>
    <SEO title="Home" />
      <HeroImage />
      <div className="layer-screen layer-screen--white"></div>
      <div className="layer-screen layer-screen--black"></div>
      <div className="layer-geometry">
        <div className="layer-geometry__square"></div>
        <div className="layer-geometry__square-2 bg--orange"></div>
        <div className="layer-geometry__square-3 bg--purple"></div>
        <div className="layer-geometry__square-4"></div>
      </div>
      <div className="wrapper">
        <section className="main">
          <div className="main__text">
            <h1 className="main__text-title">The Best Camera Service on the Web.</h1>
            <p className="main__text-subtitle">Wheteher you are <span className="color--orange">selling</span> or <span className="color--orange">buying</span> camera gear,<br/> we have many options for you.</p>
            <Link to="/" className="btn btn--main">Our Services</Link>
          </div>

        </section>

        <section className="evaluation">
          <div className="evaluation__container">
            <form className="form bg--orange color--white">
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
                <Link to="/" className="btn btn--buy">Shop</Link>
              </div>

              <div className="buy__picture">
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
      <h1 className="plife__title color--white">A Photographer's Life</h1>
      <div className="plife__container">
        <iframe class="plife__video" allowfullscreen="1" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" title="YouTube video player" src="https://www.youtube.com/embed/vFNnUbV8cpg?controls=1&amp;rel=0&amp;playsinline=0&amp;modestbranding=0&amp;autoplay=0&amp;enablejsapi=1&amp;origin=https%3A%2F%2Fcameraflips.co.uk&amp;widgetid=1" id="widget2" width="640" height="360" frameborder="0"></iframe>
      </div>
      
    </div>
   
  </Layout>
  )
}

export default HomePage
