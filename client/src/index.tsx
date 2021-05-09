import { AppProvider } from "@shopify/polaris";
import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/client";
import { Provider } from "react-redux";

import App from "./App";
import store from "./reducers";
import client from "./graphQL";
import "@shopify/polaris/dist/styles.css";

ReactDOM.render(
  <React.StrictMode>
    {/* Redux */}
    <Provider store={store}>
      {/* Apollo (for GraphQL API) */}
      <ApolloProvider client={client}>
        {/* Polaris component and theming */}
        <AppProvider
          i18n={{
            Polaris: {
              ResourceList: {
                sortingLabel: "Sort by",
                defaultItemSingular: "item",
                defaultItemPlural: "items",
                showing: "Showing {itemsCount} {resource}",
                Item: {
                  viewItem: "View details for {itemName}",
                },
              },
              Common: {
                checkbox: "checkbox",
              },
            },
          }}
          theme={{
            colorScheme: "dark", // Dark Mode :)
          }}
        >
          <App />
        </AppProvider>
      </ApolloProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root"),
);
