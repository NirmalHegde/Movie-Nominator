/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  SyntheticEvent, useCallback, useEffect, useState,
} from "react";
import { Button } from "@shopify/polaris";
import { ImageMajor } from "@shopify/polaris-icons";
import { useDispatch, useSelector } from "react-redux";
import { useLazyQuery } from "@apollo/client";
import IBaseMovie from "../../../models/interfaces/BaseMovie";
import ReduxActions from "../../../models/classes/ReduxActions";
import { RootState } from "../../../reducers";
import "./MovieCard.css";
import { FULL_MOVIE } from "../../../graphQL/queries";

const reduxActions = new ReduxActions();

const MovieCard = (props: IBaseMovie): JSX.Element => {
  const {
    Title, Year, Poster, imdbID,
  } = props;
  const nominationList = useSelector(
    (state: RootState) => state.nominationList,
  );
  const shouldCheckDisabled = useSelector(
    (state: RootState) => state.nominationListTrigger,
  );
  const [isDisabled, setIsDisabled] = useState(false);
  const [triggerModal, setTriggerModal] = useState(false);
  const dispatch = useDispatch();
  const [fullMovie, { data }] = useLazyQuery(FULL_MOVIE, {
    variables: { id: imdbID },
  });

  const addNominationToList = (): void => {
    if (nominationList.length < 5) {
      dispatch(reduxActions.addNomination({ Title, imdbID }));
      window.localStorage.setItem(
        "nominations",
        JSON.stringify(nominationList),
      );
      dispatch(reduxActions.changeNominationList());
    } else {
      dispatch(reduxActions.showErrorBanner(true));
    }
  };

  const showFullMovie = useCallback((e: SyntheticEvent) => {
    if (e.target === e.currentTarget) {
      setTriggerModal(!triggerModal);
      fullMovie();
    }
  }, [fullMovie, triggerModal]);

  useEffect(() => {
    const result = nominationList.some((nomination) => {
      return nomination.imdbID === imdbID;
    });
    setIsDisabled(result);
  }, [shouldCheckDisabled, imdbID, nominationList]);

  useEffect(() => {
    if (data) {
      dispatch(reduxActions.setFullMovie(data.fullMovie));
      dispatch(reduxActions.showFullMovie(true));
    }
  }, [data, triggerModal]);

  return (
    <div
      tabIndex={0}
      role="button"
      onKeyDown={showFullMovie}
      onClick={showFullMovie}
      className="cardContent"
    >
      {Poster !== "N/A" && <img className="poster" src={Poster} alt={Title} />}
      {imdbID !== "N/A" && Poster === "N/A" && (
        <ImageMajor className="poster" />
      )}
      &nbsp;
      <p>{`${Title} ${Year !== "N/A" ? `(${Year})` : ""}`}</p>
      {imdbID !== "N/A" && (
        <>
          <div className="buttonSpacing" />
          <div>
            <Button primary disabled={isDisabled} onClick={addNominationToList}>
              Nominate
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default MovieCard;
