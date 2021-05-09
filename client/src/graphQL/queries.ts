import { gql } from "@apollo/client";

// search for base movie (used in autocomplete)
export const MOVIE_SEARCH = gql`
  query baseMovieSearch($title: String!) {
    baseMovieSearch(title: $title) {
      Title
      Year
      Poster
      Type
      imdbID
    }
  }
`;

// search for full movie (used in modal)
export const FULL_MOVIE = gql`
  query fullMovie($id: String!) {
    fullMovie(id: $id) {
      Title
      Year
      imdbID
      Rated
      Released
      Runtime
      Genre
      Director
      Writer
      Actors
      Plot
      Poster
      Ratings {
        Source
        Value
      }
      Production
    }
  }
`;
