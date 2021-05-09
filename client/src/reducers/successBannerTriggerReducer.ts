import Redux from "../models/enums/ReduxEnum";

// trigger for displaying success banner
// "congratulations, you have made 5 nominations"
interface SuccessBannerTriggerReducer {
  type: Redux;
	payload: boolean
}

const successBannerTriggerReducer = (
  state = false,
  action: SuccessBannerTriggerReducer,
): boolean => {
  switch (action.type) {
  case Redux.ShowSuccessBanner:
    return action.payload;
  default:
    return state;
  }
};

export default successBannerTriggerReducer;
