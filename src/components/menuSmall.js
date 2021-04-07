import React, { useRef } from 'react'
import { Link } from "gatsby"
import { AnchorLink } from 'gatsby-plugin-anchor-links'
import { CSSTransition } from 'react-transition-group'

const MenuSmall = (props) => {

    const { isVisible, toggleMenu } = props;
    const ref = useRef();
    const divStyle = {zIndex: "5", position: "absolute", top: "0", left: "0", height: "100vh", width: "100vw", backgroundColor: "rgba(128, 43, 255, 0.8)"};
    const ulStyle = {padding: "15vh 0 25vh 0", height: "100vh", display: "flex", flexFlow: "column", justifyContent: "space-around", listStyle: "none"};
    const liStyle = {margin: "auto", textAlign: "center"};


    function handleClick() {
        toggleMenu(prev => {
            return !prev
        })
    }


    return (
        <CSSTransition nodeRef={ref} in={isVisible} timeout={500} classNames="menu-transition">
            <div ref={ref} onClick={() => handleClick()} onKeyUp={e => {
            if (e.key === "Escape") {
                handleClick()
            }
            }} style={divStyle} className="menu-small" role="menu" tabIndex="0">
                <nav style={{margin: "auto", width: "60%"}}>
                    <ul style={ulStyle}>
                        <li style={liStyle}><AnchorLink to="/#sell" className="nav__link">Sell</AnchorLink></li>
                        <li style={liStyle}><Link to="/shop/" className="nav__link">Shop</Link></li>
                        <li style={liStyle}><Link to="/blog/" className="nav__link">Blog</Link></li>
                        <li style={liStyle}><Link to="/" className="nav__link">About</Link></li>
                    </ul>
                </nav>
            </div>
        </CSSTransition>
        
    )
}

export default MenuSmall
