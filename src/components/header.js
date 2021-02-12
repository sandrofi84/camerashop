import { Link } from 'gatsby'
import React from 'react'

import LinkDeco from '../images/cf_link-select.svg'

const Header = () => {
    return (
        <header>
            <div className="header__logo"><img src={LinkDeco} alt="" className="header__logo__deco"/>CameraFlips</div>
            <div className="nav__container">
                <nav className="nav">
                    <Link to="/" className="nav__link"><img src={LinkDeco} alt="" className="nav__link__deco"/>Sell</Link>
                    <Link to="/" className="nav__link"><img src={LinkDeco} alt="" className="nav__link__deco"/>Shop</Link>
                    <Link to="/" className="nav__link"><img src={LinkDeco} alt="" className="nav__link__deco"/>Blog</Link>
                    <Link to="/" className="nav__link"><img src={LinkDeco} alt="" className="nav__link__deco"/>About</Link>
                </nav>
            </div>
        </header>
    )
}

export default Header;
