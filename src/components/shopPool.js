import React, { useEffect, useState } from 'react'
import ProductCard from '../components/productCard'
import Axios from 'axios'
import io from 'socket.io-client'

const ShopPool = ({products, site}) => {
    const [stock, setStock] = useState();
    

    useEffect(() => {
        const socket = io("wss://api.sandrofi.com/camerashop", { path: '/camerashop/socket.io'});
        socket.on("inventory changed", () => {
            console.log("Getting New Inventory");
            getStock()
         })

        const myRequest = Axios.CancelToken.source();
        // Call serverless function to get stock from Snipcart API
        getStock()

        async function getStock() {
            try {
                const response = await Axios.get(`https://camerashop.vercel.app/api/get-stock`, { cancelToken: myRequest.token })
                if (response.data) {
                    console.log(response.data);
                    setStock(response.data)
                }
            } catch(err) {
                console.log(err);
            }
        }

        return () => {
            myRequest.cancel();
            socket.close();
        }
    }, [site])

    return (
        <div className="shop__pool">
            { !products.length && <h3>There are no products matching your search!</h3>}
            {
                products.map(product => {
                    return <ProductCard key={product.node.id} product={product.node} site={site} stock={stock} />
                })
            }
        </div>
    )
}

export default ShopPool
