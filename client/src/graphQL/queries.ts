import { gql } from "@apollo/client";

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
