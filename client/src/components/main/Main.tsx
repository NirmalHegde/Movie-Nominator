import React from 'react';
import {ApolloProvider} from '@apollo/client';

import client from '../../graphQL/index';

import Search from './search/Search';
import './Main.css';
import MovieList from './movieList/MovieList';
import NominationList from './nominationList/NominationList';
import MovieInfo from './movieInfo/MovieInfo';

require('dotenv').config();

const Main = () => {
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
        <MovieInfo />
      </div>
    </ApolloProvider>
  );
}

export default Main;
