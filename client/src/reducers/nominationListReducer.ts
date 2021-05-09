import INomination from "../models/interfaces/Nomination";
import Redux from "../models/enums/ReduxEnum";
import genericOutputs from "../models/classes/GenericOutputs";

// state storage for nomination list
interface NominationListReducer {
  type: Redux;
  payload: INomination;
}

const nominationListReducer = (
  state: INomination[] = JSON.parse(window.localStorage.getItem("nominations") as string)
    || genericOutputs.initNominationList,
  action: NominationListReducer,
): INomination[] => {
  const returnState: INomination[] = state;
  switch (action.type) {
  case Redux.AddNomination:
    returnState.push(action.payload);
    return returnState;
  case Redux.RemoveNomination:
    return returnState.filter((nomination) => nomination.imdbID !== action.payload.imdbID);
  default:
    return returnState;
  }
};

export default nominationListReducer;
