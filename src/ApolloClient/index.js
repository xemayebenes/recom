import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { split } from 'apollo-link';

import { getAuthHeader, getToken } from 'utils/security';
const baseApiUrl =
  process.env.REACT_APP_BASE_API_URL || 'glacial-crag-96922.herokuapp.com';

const httpLink = createHttpLink({
  uri: `https://${baseApiUrl}/graphql?`
});

const wsLink = new WebSocketLink({
  uri: `wss://${baseApiUrl}/subscriptions`,
  options: {
    reconnect: true,
    connectionParams: () => ({
      authToken: getToken()
    })
  }
});
const authLink = setContext((_, { headers }) => ({
  headers: getAuthHeader(headers)
}));

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  authLink.concat(wsLink),
  authLink.concat(httpLink)
);

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});
