/* eslint-disable class-methods-use-this */
import IBaseMovie from "../interfaces/BaseMovie";
import INomination from "../interfaces/Nomination";
import Redux from "../enums/ReduxEnum";
import IFullMovie from "../interfaces/FullMovie";

// Actions used to change redux state
class ReduxActions {
  public showMovieList(): {type: Redux} {
    return {
      type: Redux.ShowMovieList,
    };
  }

  public changeNominationList(): {type: Redux} {
    return {
      type: Redux.ChangeNominationList,
    };
  }

  public setMovieList(movieList: IBaseMovie[]): {type: Redux, payload: IBaseMovie[]} {
    return {
      type: Redux.SetMovieList,
      payload: movieList,
    };
  }

  public addNomination(nomination: INomination): {type: Redux, payload: INomination} {
    return {
      type: Redux.AddNomination,
      payload: nomination,
    };
  }

  public removeNomination(nomination: INomination): {type: Redux, payload: INomination} {
    return {
      type: Redux.RemoveNomination,
      payload: nomination,
    };
  }

  public showErrorBanner(error: boolean): {type: Redux, payload: boolean} {
    return {
      type: Redux.ShowErrorBanner,
      payload: error,
    };
  }

  public showSuccessBanner(error: boolean): {type: Redux, payload: boolean} {
    return {
      type: Redux.ShowSuccessBanner,
      payload: error,
    };
  }

  public setFullMovie(movie: IFullMovie): {type: Redux, payload: IFullMovie} {
    return {
      type: Redux.SetFullMovie,
      payload: movie,
    };
  }

  public showFullMovie(show: boolean): {type: Redux, payload: boolean} {
    return {
      type: Redux.ShowFullMovie,
      payload: show,
    };
  }
}

const reduxActions = new ReduxActions();

export default reduxActions;
