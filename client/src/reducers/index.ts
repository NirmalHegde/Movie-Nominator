import { combineReducers, compose, createStore } from "redux";
import showMovieListReducer from "./showMovieList";

const allReducers = combineReducers({
  movieListTrigger: showMovieListReducer,
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
