import INomination from "../models/Nomination";
import ReduxActions from "../models/ReduxActions";
import GenericOutputs from "../models/GenericOutputs";

const genericOutputs = new GenericOutputs();

interface NominationListReducer {
  type: ReduxActions;
  payload: INomination;
}

const nominationListReducer = (
  state: INomination[] = JSON.parse(window.localStorage.getItem("nominations") as string)
    || genericOutputs.initNominationList,
  action: NominationListReducer,
): INomination[] => {
  const returnState: INomination[] = state;
  switch (action.type) {
  case ReduxActions.AddNomination:
    returnState.push(action.payload);
    return returnState;
  case ReduxActions.RemoveNomination:
    return returnState.filter((nomination) => nomination.imdbID !== action.payload.imdbID);
  default:
    return returnState;
  }
};

export default nominationListReducer;
