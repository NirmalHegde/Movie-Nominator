import IBaseMovie from "../models/interfaces/BaseMovie";
import GenericOutputs from "../models/classes/GenericOutputs";
import Redux from "../models/enums/ReduxEnum";

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
