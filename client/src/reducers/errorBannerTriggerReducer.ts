import Redux from "../models/enums/ReduxEnum";

// Trigger to activate error banner
// "You have more than 5 selections, remove one"
interface ErrorBannerTriggerReducer {
  type: Redux;
	payload: boolean
}

const errorBannerTriggerReducer = (
  state = false,
  action: ErrorBannerTriggerReducer,
): boolean => {
  switch (action.type) {
  case Redux.ShowErrorBanner:
    return action.payload;
  default:
    return state;
  }
};

export default errorBannerTriggerReducer;
