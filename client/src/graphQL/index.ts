import {
  ApolloClient, InMemoryCache, HttpLink, from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";

// graphql error handling
const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message }) => {
      alert(`GraphQL error ${message}`);
    });
  }
});

// connect to graphql api
const link = from([
  errorLink,
  new HttpLink({ uri: `${process.env.REACT_APP_PORT}/graphql` }),
]);

// create client
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

export default client;
