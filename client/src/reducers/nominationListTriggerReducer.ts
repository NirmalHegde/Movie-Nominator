import Redux from "../models/enums/ReduxEnum";

// trigger for displaying nomination list
interface NominationListTriggerReducer {
  type: Redux;
}

const nominationListTriggerReducer = (
  state = false,
  action: NominationListTriggerReducer,
): boolean => {
  switch (action.type) {
  case Redux.ChangeNominationList:
    return !state;
  default:
    return state;
  }
};

export default nominationListTriggerReducer;
