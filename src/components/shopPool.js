import React, { useEffect, useState } from 'react'
import ProductCard from '../components/productCard'
import Axios from 'axios'

const ShopPool = ({products, site}) => {
    const [stock, setStock] = useState();
    useEffect(() => {
        const myRequest = Axios.CancelToken.source();
        // Call serverless function to get stock from Snipcart API
        getStock()

        async function getStock() {
            try {
                const response = await Axios.get(`${site}/api/get-stock`, { cancelToken: myRequest.token })
                console.log(response);
            } catch(err) {
                console.log(err);
            }
        }

        return () => {
            myRequest.cancel();
        }
    }, [site])

    return (
        <div className="shop__pool">
            {
                products.map(product => {
                    return <ProductCard key={product.node.id} product={product.node} site={site} stock={stock} />
                })
            }
        </div>
    )
}

export default ShopPool
