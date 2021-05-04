import IBaseMovie from "../models/BaseMovie";
import GenericOutputs from "../models/GenericOutputs";
import ReduxActions from "../models/ReduxActions";

interface MovieListReducer {
  type: ReduxActions;
  payload: IBaseMovie[];
}

const genericOutputs = new GenericOutputs();
const movieListReducer = (
  state = genericOutputs.initMovieList,
  action: MovieListReducer,
): IBaseMovie[] => {
  switch (action.type) {
  case ReduxActions.SetMovieList:
    return action.payload;
  default:
    return state;
  }
};

export default movieListReducer;
