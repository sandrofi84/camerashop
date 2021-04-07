import React from 'react'
import { Link } from "gatsby"
import { AnchorLink } from 'gatsby-plugin-anchor-links'

import LinkDeco from '../images/cf_link-select.svg'

const MenuLarge = () => {

    return (
        <nav className="nav--large">
            <AnchorLink to="/#sell" className="nav__link"><img src={LinkDeco} alt="" className="nav__link__deco"/>Sell</AnchorLink>
            <Link to="/shop/" className="nav__link"><img src={LinkDeco} alt="" className="nav__link__deco"/>Shop</Link>
            <Link to="/blog/" className="nav__link"><img src={LinkDeco} alt="" className="nav__link__deco"/>Blog</Link>
            <Link to="/" className="nav__link"><img src={LinkDeco} alt="" className="nav__link__deco"/>About</Link>
        </nav>
    )
}

export default MenuLarge
