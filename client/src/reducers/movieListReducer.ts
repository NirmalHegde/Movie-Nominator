import IBaseMovie from "../models/BaseMovie";
import GenericOutputs from "../models/GenericOutputs";
import Redux from "../models/ReduxEnum";

interface MovieListReducer {
  type: Redux;
  payload: IBaseMovie[];
}

const genericOutputs = new GenericOutputs();
const movieListReducer = (
  state = genericOutputs.initMovieList,
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
