import IBaseMovie from "../models/BaseMovie";
import INomination from "../models/Nomination";
import ReduxActions from "../models/ReduxActions";

export function showMovieList(): {type: string} {
  return {
    type: ReduxActions.ShowMovieList,
  };
}

export function changeNominationList(): {type: string} {
  return {
    type: ReduxActions.ChangeNominationList,
  };
}

export function setMovieList(movieList: IBaseMovie[]): {type: string, payload: IBaseMovie[]} {
  return {
    type: ReduxActions.SetMovieList,
    payload: movieList,
  };
}

export function addNomination(nomination: INomination): {type: string, payload: INomination} {
  return {
    type: ReduxActions.AddNomination,
    payload: nomination,
  };
}

export function removeNomination(nomination: INomination): {type: string, payload: INomination} {
  return {
    type: ReduxActions.RemoveNomination,
    payload: nomination,
  };
}
