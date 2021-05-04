import ReduxActions from "../models/ReduxActions";

export function showMovieList(): {type: string} {
  return {
    type: ReduxActions.ShowMovieList,
  };
}

export function setMovieList(movieList: any): {type: string, payload: any} {
  return {
    type: ReduxActions.SetMovieList,
    payload: movieList,
  };
}
