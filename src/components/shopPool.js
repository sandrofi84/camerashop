import React, { useEffect, useState } from 'react'
import ProductCard from '../components/productCard'
import Axios from 'axios'
import initClient from '../functions/initClient'


const ShopPool = ({products, site}) => {
    const [stock, setStock] = useState();
    

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
