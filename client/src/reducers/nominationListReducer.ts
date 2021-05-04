import INomination from "../models/Nomination";
import ReduxActions from "../models/ReduxActions";
import GenericOutputs from "../models/GenericOutputs";

const genericOutputs = new GenericOutputs();

interface NominationListReducer {
  type: ReduxActions;
  payload: INomination;
}

const nominationListReducer = (
  state = genericOutputs.initNominationList,
  action: NominationListReducer,
): INomination[] => {
  const returnState = state;
  switch (action.type) {
  case ReduxActions.AddNomination:
    returnState.push(action.payload);
    return returnState;
  case ReduxActions.RemoveNomination:
    return returnState.filter((nomination) => nomination !== action.payload);
  default:
    return returnState;
  }
};

export default nominationListReducer;
