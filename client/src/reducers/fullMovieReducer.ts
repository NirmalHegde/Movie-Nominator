import GenericOutputs from "../models/classes/GenericOutputs";
import Redux from "../models/enums/ReduxEnum";
import IFullMovie from "../models/interfaces/FullMovie";

interface FullMovieReducer {
  type: Redux;
  payload: IFullMovie;
}

const genericOutputs = new GenericOutputs();
const fullMovieReducer = (
  state = genericOutputs.initFullMovie,
  action: FullMovieReducer,
): IFullMovie => {
  switch (action.type) {
  case Redux.SetFullMovie:
    return action.payload;
  default:
    return state;
  }
};

export default fullMovieReducer;
