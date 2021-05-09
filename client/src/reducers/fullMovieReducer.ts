import genericOutputs from "../models/classes/GenericOutputs";
import Redux from "../models/enums/ReduxEnum";
import IFullMovie from "../models/interfaces/FullMovie";

// state storage for full movie to display in modal
interface FullMovieReducer {
  type: Redux;
  payload: IFullMovie;
}

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
