import React from 'react';
import Search from "./search/Search";
import { ApolloProvider } from "@apollo/client";
import client from "../../graphQL/index";
import "./Main.css"
import MovieList from './movieList/MovieList';
import NominationList from './nominationList/NominationList';

require('dotenv').config();

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="root">
        <h1 className="title">🎉 Welcome to the Shoppies! 🎉</h1>
        <h2 className="title">Nominate your favourite films for the esteemed Shoscars, given out every year at the annual Shoppies Convention in Ottawa, Ontario! </h2>
        <br />
        <Search />
        <div className="content">
          <MovieList />
          <NominationList />
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
