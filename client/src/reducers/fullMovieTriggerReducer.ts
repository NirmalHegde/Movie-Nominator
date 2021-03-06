import Redux from "../models/enums/ReduxEnum";

// trigger to open modal with full movie
interface FullMovieTriggerReducer {
  type: Redux;
  payload: boolean;
}

const fullMovieTriggerReducer = (
  state = false,
  action: FullMovieTriggerReducer,
): boolean => {
  switch (action.type) {
  case Redux.ShowFullMovie:
    return action.payload;
  default:
    return state;
  }
};

export default fullMovieTriggerReducer;
