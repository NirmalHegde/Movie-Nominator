import { combineReducers, compose, createStore } from "redux";
import movieListTriggerReducer from "./movieListTriggerReducer";
import movieListReducer from "./movieListReducer";

const allReducers = combineReducers({
  movieListTrigger: movieListTriggerReducer,
  movieList: movieListReducer,
});

/* eslint-disable */
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  allReducers /* preloadedState, */,
  composeEnhancers()
);
/* eslint-enable */

export default store;
export type RootState = ReturnType<typeof allReducers>
