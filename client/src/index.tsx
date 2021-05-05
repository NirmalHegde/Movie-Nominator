import { AppProvider } from "@shopify/polaris";
import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/client";
import { Provider } from "react-redux";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "@shopify/polaris/dist/styles.css";
import store from "./reducers";
import client from "./graphQL";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={client}>
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
            colorScheme: "dark",
          }}
        >
          <App />
        </AppProvider>
      </ApolloProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
