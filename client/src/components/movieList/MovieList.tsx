/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Card } from "@shopify/polaris";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers";
import IBaseMovie from "../../models/interfaces/BaseMovie";
import MovieCard from "./movieCard/MovieCard";
import "./MovieList.css";

const MovieList: React.FC = (): JSX.Element => {
  const shouldMovieListLoad = useSelector(
    (state: RootState) => state.movieListTrigger,
  );
  const movieList = useSelector((state: RootState) => state.movieList);
  const [componentMovieList, setComponentMovieList] = useState<IBaseMovie[]>([]);

  // side effect to load movie after user searches
  useEffect(() => {
    setComponentMovieList(movieList);
  }, [shouldMovieListLoad]);

  return (
    <div className="movieListRoot">
      <div className="border">
        <Card sectioned>
          <h1 className="movieListTitle">Results</h1>
          {componentMovieList.length > 0 && (
            <div className="scroll">
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
                  </>
                );
              })}
            </div>
          )}
          {componentMovieList.length < 1 && (
            <p className="movieListInit">
              Start by searching above to find your favourite movies!
            </p>
          )}
        </Card>
      </div>
    </div>
  );
};

export default MovieList;
