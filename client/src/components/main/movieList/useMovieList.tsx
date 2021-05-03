/* eslint-disable-next-line no-unused-vars */
import React, { useEffect, useState } from "react";
import { QueryLazyOptions, useLazyQuery } from "@apollo/client";
import { MOVIE_SEARCH } from "../../../graphQL/queries";
import IBaseMovie from "../../../models/BaseMovie";

const baseMovie: string = "Search above for the movie you want to nominate!";

interface MovieListHook { /* eslint-disable-next-line no-unused-vars */
  movieListInput: (options?: QueryLazyOptions<{ title: string }>) => void;
  movieList: IBaseMovie[] | string;
}

export default function useMovieList(searchInput: string): MovieListHook {
  const [movieList, setMovieList] = useState<IBaseMovie[] | string>(baseMovie);
  const [baseMovieSearch, { data }] = useLazyQuery(MOVIE_SEARCH, {
    variables: { title: searchInput },
  });

  useEffect(() => {
    if (data) {
      setMovieList(data.baseMovieSearch);
    }
  }, [data]);

  return {
    movieListInput: baseMovieSearch,
    movieList,
  };
}
