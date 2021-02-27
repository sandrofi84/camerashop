import React, { useEffect, useState } from 'react'
import ProductCard from '../components/productCard'
import Axios from 'axios'
import { gql, ApolloClient, InMemoryCache, ApolloLink } from '@apollo/client'
import { createAuthLink } from 'aws-appsync-auth-link';
import { createSubscriptionHandshakeLink } from 'aws-appsync-subscription-link';
import config from '../config/appsyncConfig'



const ShopPool = ({products, site}) => {
    const [stock, setStock] = useState();
    

    useEffect(() => {

        const region = config.APPSYNC_REGION;
        const appsyncId = config.APPSYNC_GRAPHQL_API_ID
        const url2 = 'ws://192.168.1.221:20002'
        const url = `wss://${appsyncId}.appsync-api.${region}.amazonaws.com/graphql`;
        const auth = {
        type: config.APPSYNC_AUTH_TYPE,
        apiKey: config.APPSYNC_API_KEY,
        };

        const link = ApolloLink.from([
        createAuthLink({ url2, region, auth }),
        createSubscriptionHandshakeLink({url2, region, auth})
        ]);
        
        const client = new ApolloClient({
            link,
            cache: new InMemoryCache()
        })

        const MESSAGE_QUERY = gql`
        query MyQuery {
            getMessage
        }
        `;

        async function getMessage() {
            console.log("Running getMessage");
            try {
                const message = await client.query({ query: MESSAGE_QUERY })
                console.log(message);
            } catch(err) {
                console.log(err);
            }
        }

        getMessage();



        

        const INVENTORY_SUBSCRIPTION = gql`
          subscription OnUpdateInventory {
            inventoryUpdates
          }
        `;



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
