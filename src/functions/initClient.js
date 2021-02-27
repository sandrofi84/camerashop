import { gql, ApolloClient, InMemoryCache, ApolloLink } from '@apollo/client'
import { createAuthLink } from 'aws-appsync-auth-link';
import { createSubscriptionHandshakeLink } from 'aws-appsync-subscription-link';
import config from '../config/appsyncConfig'


export default () => {
    const region = config.APPSYNC_REGION;
        const appsyncId = config.APPSYNC_GRAPHQL_API_ID
        const url = `https://${appsyncId}.appsync-api.${region}.amazonaws.com/graphql`;
        const auth = {
        type: config.APPSYNC_AUTH_TYPE,
        apiKey: config.APPSYNC_API_KEY,
        };

        const authLink = createAuthLink({ url, region, auth })
        const subHandLink = createSubscriptionHandshakeLink({url, region, auth})

        const link = ApolloLink.from([
        authLink,
        subHandLink
        ]);
        
        const client = new ApolloClient({
            link,
            cache: new InMemoryCache()
        })

        const INVENTORY_SUBSCRIPTION = gql`
          subscription OnUpdateInventory {
            inventoryUpdates
          }
        `;

        return [client, INVENTORY_SUBSCRIPTION]
}