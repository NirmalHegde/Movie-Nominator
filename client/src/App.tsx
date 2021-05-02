import Search from "./components/search/Search";
import { ApolloProvider } from "@apollo/client";
import client from "./graphQL";

require('dotenv').config();

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Search />
      </div>
    </ApolloProvider>
  );
}

export default App;
