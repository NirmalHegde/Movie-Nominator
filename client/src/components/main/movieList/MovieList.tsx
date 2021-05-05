/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Card } from "@shopify/polaris";
import { useSelector } from "react-redux";
import { RootState } from "../../../reducers";
import IBaseMovie from "../../../models/interfaces/BaseMovie";
import MovieCard from "./movieCard/MovieCard";
import "./MovieList.css";

const initMovieList: IBaseMovie[] = [
  {
    Title: "Start by searching for your favourite movies above!",
    Year: "N/A",
    imdbID: "N/A",
    Poster: "N/A",
  },
];

const MovieList = (): JSX.Element => {
  const shouldMovieListLoad = useSelector(
    (state: RootState) => state.movieListTrigger,
  );
  const movieList = useSelector((state: RootState) => state.movieList);
  const [componentMovieList, setComponentMovieList] = useState(initMovieList);

  useEffect(() => {
    setComponentMovieList(movieList);
  }, [shouldMovieListLoad]);

  return (
    <div className="movieListRoot" style={{ flexGrow: 2 }}>
      <Card sectioned>
        <div style={{ overflowY: "auto", height: "60vh" }}>
          {componentMovieList.map((movie) => {
            return (
              <>
                <MovieCard
                  key={movie.imdbID}
                  Title={movie.Title}
                  Year={movie.Year}
                  Poster={movie.Poster}
                  imdbID={movie.imdbID}
                />
                <hr />
              </>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default MovieList;
