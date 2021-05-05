import Redux from "../models/ReduxEnum";

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
