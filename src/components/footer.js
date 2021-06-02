import React from 'react'

import sandrofiLogo from '../images/sandrofi-logo.svg'

const Footer = () => {
    return (
        <footer className="footer bg--grey color--white">
            <div className="footer__credits-container">
                <small>**Main photo by Mengliu Di from Pexels</small>
                <small>**Buy Section photo by Math from Pexels</small>
                <small>**Services Section "Consignment" photo by Sora Shimazaki from Pexels</small>
                <small>**Services Section "Rent" photo by Yender Gonzalez on Unsplash</small>
                <small>**Blog Section "Camera silhouette" photo by Derice Jason Fahnkow from Pexels</small>
            </div>
            <div className="footer__madeby-container">
                <p className="footer__madeby__text">
                    Made with ❤️ by 
                </p>
                <a href="https://www.sandrofi.com/" target="_blank" className="footer__madeby__logo">
                    <img src={sandrofiLogo} alt="sandrofi"/>
                </a>
                
            </div>
        </footer>
    )
}

export default Footer
