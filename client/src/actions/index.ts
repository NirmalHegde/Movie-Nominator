/* eslint-disable class-methods-use-this */
import IBaseMovie from "../models/BaseMovie";
import INomination from "../models/Nomination";
import Redux from "../models/ReduxEnum";

export default class ReduxActions {
  public showMovieList(): {type: string} {
    return {
      type: Redux.ShowMovieList,
    };
  }

  public changeNominationList(): {type: string} {
    return {
      type: Redux.ChangeNominationList,
    };
  }

  public setMovieList(movieList: IBaseMovie[]): {type: string, payload: IBaseMovie[]} {
    return {
      type: Redux.SetMovieList,
      payload: movieList,
    };
  }

  public addNomination(nomination: INomination): {type: string, payload: INomination} {
    return {
      type: Redux.AddNomination,
      payload: nomination,
    };
  }

  public removeNomination(nomination: INomination): {type: string, payload: INomination} {
    return {
      type: Redux.RemoveNomination,
      payload: nomination,
    };
  }
}
