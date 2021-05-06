import Redux from "../models/enums/ReduxEnum";

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
    if (action.payload === true) {
      return true;
    }
    return false;

  default:
    return state;
  }
};

export default successBannerTriggerReducer;
