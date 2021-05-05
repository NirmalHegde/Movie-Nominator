import Redux from "../models/enums/ReduxEnum";

interface ErrorBannerTriggerReducer {
  type: Redux;
	payload: boolean
}

const movieListTriggerReducer = (
  state = false,
  action: ErrorBannerTriggerReducer,
): boolean => {
  switch (action.type) {
  case Redux.ShowErrorBanner:
    if (action.payload === true) {
      return true;
    }
    return false;

  default:
    return state;
  }
};

export default movieListTriggerReducer;
