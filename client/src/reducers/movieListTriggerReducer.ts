import Redux from "../models/Redux";

interface MovieListTriggerReducer {
  type: Redux;
}

const movieListTriggerReducer = (
  state = false,
  action: MovieListTriggerReducer,
): boolean => {
  switch (action.type) {
  case Redux.ShowMovieList:
    return !state;
  default:
    return state;
  }
};

export default movieListTriggerReducer;
