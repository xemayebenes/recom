import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { getAuthHeader } from 'utils/security';
const baseApiUrl = process.env.REACT_APP_BASE_API_URL || '';

const httpLink = createHttpLink({
  uri: `${baseApiUrl}/graphql?`
});
const authLink = setContext((_, { headers }) => ({
  headers: getAuthHeader(headers)
}));

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});
