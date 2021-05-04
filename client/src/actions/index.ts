import ReduxActions from "../models/ReduxActions";

export function showMovieList(): {type: string} {
  return {
    type: ReduxActions.ShowMovieList,
  };
}
