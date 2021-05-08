/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Card } from "@shopify/polaris";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers";
import IBaseMovie from "../../models/interfaces/BaseMovie";
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

const MovieList: React.FC = (): JSX.Element => {
  const shouldMovieListLoad = useSelector(
    (state: RootState) => state.movieListTrigger,
  );
  const movieList = useSelector((state: RootState) => state.movieList);
  const [componentMovieList, setComponentMovieList] = useState(initMovieList);

  useEffect(() => {
    setComponentMovieList(movieList);
  }, [shouldMovieListLoad]);

  return (
    <div className="movieListRoot">
      <div className="border">
        <Card sectioned>
          <h1 className="movieListTitle">Results</h1>
          <div className="scroll">
            {componentMovieList.map((movie) => {
              if (movie.imdbID === "N/A") {
                return (
                  <p className="movieListInit">
                    Start by searching above to find your favourite movies!
                  </p>
                );
              }
              return (
                <>
                  <MovieCard
                    key={movie.imdbID}
                    Title={movie.Title}
                    Year={movie.Year}
                    Poster={movie.Poster}
                    imdbID={movie.imdbID}
                  />
                </>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MovieList;
