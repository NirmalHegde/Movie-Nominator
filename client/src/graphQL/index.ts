import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message }) => {
      alert(`GraphQL error ${message}`);
			return;
    });
  }
});

const link = from([
  errorLink,
  new HttpLink({uri: `${process.env.REACT_APP_PORT}/graphql`})
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link
});

export default client;