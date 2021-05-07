import Redux from "../models/enums/ReduxEnum";

interface FullMovieTriggerReducer {
  type: Redux;
}

const fullMovieTriggerReducer = (
  state = false,
  action: FullMovieTriggerReducer,
): boolean => {
  switch (action.type) {
  case Redux.ShowFullMovie:
    return !state;
  default:
    return state;
  }
};

export default fullMovieTriggerReducer;
