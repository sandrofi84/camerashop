import React from 'react'

const MenuIcon = (props) => {
    const { toggleMenu, navIsVisible } = props;

    function handleClick() {
        toggleMenu(prev => {
            return !prev
        })
    }

    return (
        <div role="button" tabIndex="0" onKeyUp={e => {
            if (e.key === "Enter") {
                handleClick()
            }
        }} onClick={handleClick}  style={{}} className={`menu-icon${navIsVisible ? " menu-icon--X" : ""}`}>
            <div className="menu-icon__rod"></div>
        </div>
    )
}

export default MenuIcon
