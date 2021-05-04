import React, { useEffect, useState } from "react";
import { Card } from "@shopify/polaris";
import { useSelector } from "react-redux";
import { RootState } from "../../../reducers";
import IBaseMovie from "../../../models/BaseMovie";
import MovieCard from "./movieCard/MovieCard";

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
    <div style={{ width: "40vw" }}>
      <Card sectioned>
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
      </Card>
    </div>
  );
};

export default MovieList;
