import React from 'react';
import Search from "./components/search/Search";
import { ApolloProvider } from "@apollo/client";
import client from "./graphQL/index";
import "./app.css"
import MovieList from './components/movieList/MovieList';

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
          <MovieList />
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
