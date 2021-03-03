import React, {useState} from 'react'

const FilterTool = ({categories, products, setFilteredProducts}) => {
    const [activeFilter, setActiveFilter] = useState("shop-all");
    function filterByCategory(category) {
        const filteredProducts = products.filter(product => product.node.category.categoryName === category)
        setActiveFilter(category)
        setFilteredProducts(filteredProducts)
    }
    return (
        <div role="menu" className="shop__menu color--white">
                <div className="filter-tool__list">
                    <button role="menuitem" style={activeFilter === "shop-all" ? {textDecoration: "underline"} : {textDecoration: "none"}} onClick={() => {
                        setActiveFilter("shop-all")
                        setFilteredProducts(null)
                        }} onKeyUp={(e) => {
                            if (e.key === "Enter") {
                                setActiveFilter("shop-all")
                                setFilteredProducts(null)
                            }
                            }} className="filter-tool__list-item" tabIndex="0">Shop All</button>
                    {categories.map(category => {
                        const categoryName = category.node.categoryName
                        return <button 
                        key={categoryName} 
                        role="menuitem" 
                        style={activeFilter === categoryName ? {textDecoration: "underline"} : {textDecoration: "none"}} 
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
    )
}

export default FilterTool
