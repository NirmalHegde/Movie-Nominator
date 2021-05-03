import React from "react";
import { ApolloProvider } from "@apollo/client";
import client from "./graphQL/index";
import Main from "./components/main/Main";

const dotenv = require("dotenv");

dotenv.config();

/* eslint-disable-next-line no-undef */
const App = (): JSX.Element => (
  <ApolloProvider client={client}>
    <div>
      <Main />
    </div>
  </ApolloProvider>
);

export default App;
