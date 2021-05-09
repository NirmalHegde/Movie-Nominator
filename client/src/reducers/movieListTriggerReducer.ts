import Redux from "../models/enums/ReduxEnum";

// trigger used to show the movie list
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
