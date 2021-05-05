import { combineReducers, compose, createStore } from "redux";
import movieListTriggerReducer from "./movieListTriggerReducer";
import movieListReducer from "./movieListReducer";
import nominationListReducer from "./nominationListReducer";
import nominationListTriggerReducer from "./nominationListTriggerReducer";
import errorBannerTriggerReducer from "./errorBannerTriggerReducer";

const rootReducer = combineReducers({
  movieListTrigger: movieListTriggerReducer,
  movieList: movieListReducer,
  nominationList: nominationListReducer,
  nominationListTrigger: nominationListTriggerReducer,
  errorBannerTrigger: errorBannerTriggerReducer,
});

/* eslint-disable */
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer /* preloadedState, */,
  composeEnhancers()
);
/* eslint-enable */

export default store;
export type RootState = ReturnType<typeof rootReducer>
