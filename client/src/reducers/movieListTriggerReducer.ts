import ReduxActions from "../models/ReduxActions";

interface MovieListTriggerReducer {
  type: ReduxActions;
}

const movieListTriggerReducer = (
  state = false,
  action: MovieListTriggerReducer,
): boolean => {
  switch (action.type) {
  case ReduxActions.ShowMovieList:
    return !state;
  default:
    return state;
  }
};

export default movieListTriggerReducer;
