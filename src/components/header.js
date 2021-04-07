import { Link } from 'gatsby'
import React, { useState } from 'react'

import LinkDeco from '../images/cf_link-select.svg'
import shoppingBag from '../images/shopping-bag.svg'

import MenuLarge from './menuLarge'
import MenuIcon from './menuIcon'
import MenuSmall from './menuSmall'

const Header = () => {
    const [navIsVisible, setNavIsVisible] = useState(false);

    return (
        <header>
            <div className="header__logo"><Link to="/" className="header__logo-link"><img src={LinkDeco} alt="" className="header__logo__deco"/>CameraShop</Link></div>
            <div className="nav__container">
                
                <MenuLarge />
                <MenuSmall isVisible={navIsVisible} toggleMenu={setNavIsVisible} />
                <div className="snipcart-checkout">
                    <img src={shoppingBag} alt="shopping-cart" className="nav__cart-icon"/>
                    <span id="snipcart-items-count" className="snipcart-items-count">0</span>
                </div>
                <MenuIcon navIsVisible={navIsVisible} toggleMenu={setNavIsVisible} />
            </div>
        </header>
    )
}

export default Header;
