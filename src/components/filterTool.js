import React, {useState} from 'react'

const FilterTool = ({categories, products, setFilteredProducts}) => {
    const [activeFilter, setActiveFilter] = useState("shop-all");
    function filterByCategory(category) {
        const filteredProducts = products.filter(product => product.node.category.categoryName === category)
        setActiveFilter(category)
        setFilteredProducts(filteredProducts)
    }
    return (
        <div className="shop__menu color--white">
                <ul className="filter-tool__list">
                    <li style={activeFilter === "shop-all" ? {textDecoration: "underline"} : {textDecoration: "none"}} onClick={() => {
                        setActiveFilter("shop-all")
                        setFilteredProducts(null)
                        }} className="filter-tool__list-item">Shop All</li>
                    {categories.map(category => {
                        const categoryName = category.node.categoryName
                        return <li key={categoryName} style={activeFilter === categoryName ? {textDecoration: "underline"} : {textDecoration: "none"}} onClick={() => filterByCategory(categoryName)} className="filter-tool__list-item" >{categoryName}</li>
                    })}
                </ul>
            </div>
    )
}

export default FilterTool
