import IBaseMovie from "../models/interfaces/BaseMovie";
import Redux from "../models/enums/ReduxEnum";

// state storage for movie list
interface MovieListReducer {
  type: Redux;
  payload: IBaseMovie[];
}

const movieListReducer = (
  state = [],
  action: MovieListReducer,
): IBaseMovie[] => {
  switch (action.type) {
  case Redux.SetMovieList:
    return action.payload;
  default:
    return state;
  }
};

export default movieListReducer;
