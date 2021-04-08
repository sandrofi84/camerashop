import React, { useEffect, useState, useContext, useRef, useCallback } from 'react'
import ProductCard from '../components/productCard'
import Axios from 'axios'
import initClient from '../functions/initClient'
import StateContext from "../context/stateContext"


const ShopPool = ({products, siteUrl}) => {
    const appState = useContext(StateContext);
    const [stock, setStock] = useState();
    const [sortedProducts, setSortedProducts] = useState(products);
    const selectRef = useRef()

    const sortProductsBy = useCallback((method) => {

        function byLowToHigh(a, b) {
            return a.node.price - b.node.price
        }

        function byHighToLow(a, b) {
            return b.node.price - a.node.price
        }

        let newSortedProducts;

        switch(method) {
            case "lowToHigh":
                newSortedProducts = [...products].sort(byLowToHigh)
                break
            case "highToLow":
                newSortedProducts = [...products].sort(byHighToLow)
                break
            default:
                newSortedProducts = [...products]
        }

        setSortedProducts(newSortedProducts)
    }, [products])

    useEffect(() => {
        setSortedProducts(products)
        sortProductsBy(selectRef.current.value)
    }, [products, sortProductsBy])
    

    useEffect(() => {

        const myRequest = Axios.CancelToken.source();
        
        // Call serverless function to get stock from Snipcart API
        getStock()

        async function getStock() {
            try {
                const response = await Axios.get(`https://camerashop.vercel.app/api/get-stock`, { cancelToken: myRequest.token })

                if (response.data) {
                    setStock(response.data)
                }
            } catch(err) {
                console.log(err);
            }
        }

        const [client, INVENTORY_SUBSCRIPTION] = initClient()
        
        // Make subscription query to Appsync to get stock updates when someone completes an order
        const subscription = client.subscribe({ query: INVENTORY_SUBSCRIPTION }).subscribe({
            next(data) {

              if (data.data.inventoryUpdates) {
                console.log("Updated stock: \n", data.data.inventoryUpdates);
                setStock(data.data.inventoryUpdates)
              }
            },
            error(err) { console.error('err', err); },
        })

        return () => {
            myRequest.cancel();
            subscription.unsubscribe();
        }
    }, [siteUrl])

    return (
        <div className={`shop__pool-container${appState.moreFiltersMenuIsVisible ? " shop__pool-container--push-right" : ""}`}>
            <div className="shop__pool-sortby">
                <label htmlFor="shop__pool-sortby">Sort By:</label>
                <select ref={selectRef} onChange={e => sortProductsBy(e.target.value)} name="sortBy" id="shop__pool-sortby">
                    <option value="newest">Newest</option>
                    <option value="lowToHigh">Price - Low to High</option>
                    <option value="highToLow">Price - High to Low</option>
                </select>
            </div>
            

            <div className="shop__pool">
                { !products.length && <div className="shop__pool-no-match-container"><h3>There are no products matching your search!</h3></div>}
                {
                    sortedProducts.map(product => {
                        return <ProductCard key={product.node.id} product={product.node} siteUrl={siteUrl} stock={stock} onlyAvailable={appState.activeFilters.onlyAvailable} />
                    })
                }
            </div>

        </div>
        
    )
}

export default ShopPool
