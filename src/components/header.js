import { Link } from 'gatsby'
import React from 'react'

import LinkDeco from '../images/cf_link-select.svg'
import shoppingBag from '../images/shopping-bag.svg'

const Header = () => {
    return (
        <header>
            <div className="header__logo"><Link to="/" className="header__logo-link"><img src={LinkDeco} alt="" className="header__logo__deco"/>CameraShop</Link></div>
            <div className="nav__container">
                <nav className="nav">
                    <Link to="/" className="nav__link"><img src={LinkDeco} alt="" className="nav__link__deco"/>Sell</Link>
                    <Link to="/shop/" className="nav__link"><img src={LinkDeco} alt="" className="nav__link__deco"/>Shop</Link>
                    <Link to="/blog/" className="nav__link"><img src={LinkDeco} alt="" className="nav__link__deco"/>Blog</Link>
                    <Link to="/" className="nav__link"><img src={LinkDeco} alt="" className="nav__link__deco"/>About</Link>
                    <div className="snipcart-checkout">
                        <img src={shoppingBag} alt="shopping-cart" className="nav__cart-icon"/>
                        <span className="snipcart-items-count">0</span>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Header;
