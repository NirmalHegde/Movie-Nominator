import ReduxActions from "../models/ReduxActions";

interface NominationListTriggerReducer {
  type: ReduxActions;
}

const nominationListTriggerReducer = (
  state = false,
  action: NominationListTriggerReducer,
): boolean => {
  switch (action.type) {
  case ReduxActions.ChangeNominationList:
    return !state;
  default:
    return state;
  }
};

export default nominationListTriggerReducer;
