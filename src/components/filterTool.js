import React, {useContext} from 'react'

import StateContext from "../context/stateContext"
import DispatchContext from "../context/dispatchContext"
import filterIcon from "../images/filter-line.svg"
import MoreFiltersMenu from "../components/moreFiltersMenu"
import clearFiltersIcon from "../images/close-square-line.svg"

const FilterTool = ({products, categories, makes}) => {

    const appState = useContext(StateContext);
    const appDispatch = useContext(DispatchContext);
    const pricesArray = products.map(product => {
        return product.node.discountPrice ? product.node.discountPrice : product.node.price
    })
    const minPriceDefault = Math.floor(Math.min(...pricesArray))
    const maxPriceDefault = Math.ceil(Math.max(...pricesArray))
    
    // ClearFilters Button is visible only when any filters are applied
    const clearFiltersBtnStyle = appState.activeFilters.onlyAvailable || appState.activeFilters.onlySale || appState.activeFilters.make.length || (appState.activeFilters.price.length !== 0 &&  (appState.activeFilters.price[0] !== minPriceDefault || appState.activeFilters.price[1] !== maxPriceDefault)) ? {display: "block"} : {display: "none"}


    function filterByCategory(category) {
        appDispatch({type: "setCategoryFilter", filter: category})
        appDispatch({type: "filterProducts"})
    }

    return (
        <div className="filter-tool__container">
            <div role="menu" className="shop__menu color--white">

                <button onClick={() => appDispatch({type: "toggleMoreFiltersMenu"})} className={`filter-tool__more-filters-btn${appState.moreFiltersMenuIsVisible ? " filter-tool__more-filters-btn--pressed" : ""}`}>More Filters <img src={filterIcon} alt="filter"/></button>

                <div className="filter-tool__list">
                    <button role="menuitem" style={appState.activeFilters.category === "shop-all" ? {textDecoration: "underline"} : {textDecoration: "none"}} onClick={() => {
                            filterByCategory("shop-all")
                        }} onKeyUp={(e) => {
                            if (e.key === "Enter") {
                                filterByCategory("shop-all")
                            }
                            }} className="filter-tool__list-item" tabIndex="0">Shop All</button>
                    {categories.map(category => {
                        const categoryName = category.node.categoryName
                        return <button 
                        key={categoryName} 
                        role="menuitem" 
                        style={appState.activeFilters.category === categoryName ? {textDecoration: "underline"} : {textDecoration: "none"}} 
                        onClick={() => filterByCategory(categoryName)}
                        onKeyUp={(e) => {
                            if (e.key === "Enter") {
                                filterByCategory(categoryName)
                            }
                            }} 
                        className="filter-tool__list-item" 
                        tabIndex="0">{categoryName}</button>
                    })}
                </div>
            </div>
            <button onClick={() => appDispatch({type: "clearFilters"})} className="filter-tool__clear-filters-btn color--white" style={clearFiltersBtnStyle} >clear filters <img src={clearFiltersIcon} alt="close button"/></button>
            <div className={`more-filters-menu__container${appState.moreFiltersMenuIsVisible ? " more-filters-menu__container--show" : ""}`} >
                <div className="more-filters-menu__invisible-block"></div>
                <MoreFiltersMenu makes={makes} minPriceDefault={minPriceDefault} maxPriceDefault={maxPriceDefault}/>
            </div>
            
        </div>
    )
}

export default FilterTool
