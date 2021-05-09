/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import React, {
  SyntheticEvent, useCallback, useEffect, useState,
} from "react";
import { Button } from "@shopify/polaris";
import { ImageMajor } from "@shopify/polaris-icons";
import { useDispatch, useSelector } from "react-redux";
import { useLazyQuery } from "@apollo/client";
import IBaseMovie from "../../../models/interfaces/BaseMovie";
import reduxActions from "../../../models/classes/ReduxActions";
import { RootState } from "../../../reducers";
import "./MovieCard.css";
import { FULL_MOVIE } from "../../../graphQL/queries";

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
  const [showMovie, setShowMovie] = useState(false);
  const dispatch = useDispatch();
  const [fullMovie, { data }] = useLazyQuery(FULL_MOVIE, {
    variables: { id: imdbID },
  });

  // animation when loading cards
  useEffect(() => {
    setTimeout(() => {
      setShowMovie(true);
    }, 200);
  }, []);

  // side effect to check if nominate button should be disabled
  useEffect(() => {
    const result = nominationList.some((nomination) => {
      return nomination.imdbID === imdbID;
    });
    setIsDisabled(result);
  }, [shouldCheckDisabled, imdbID]);

  // side effect to open modal after data has been received from graphql
  useEffect(() => {
    if (data) {
      dispatch(reduxActions.setFullMovie(data.fullMovie));
      dispatch(reduxActions.showFullMovie(true));
    }
  }, [data, triggerModal]);

  // function to add nomination to list
  const addNominationToList = (): void => {
    // check if nomination list is able to store another nomination
    if (nominationList.length < 5) {
      // add nomination to redux and local storage
      dispatch(reduxActions.addNomination({ Title, imdbID, Year }));
      window.localStorage.setItem(
        "nominations",
        JSON.stringify(nominationList),
      );
      dispatch(reduxActions.changeNominationList()); // update nomination list
    } else {
      dispatch(reduxActions.showErrorBanner(true)); // shown if exceeding 5 nominations
    }
  };

  // query graphql for full movie information to display
  const showFullMovie = useCallback(
    (e: SyntheticEvent) => {
      if (e.target === e.currentTarget) {
        setTriggerModal(!triggerModal);
        fullMovie(); // query graphql db for updated information on full movie
      }
    },
    [fullMovie, triggerModal],
  );

  return (
    <div
      tabIndex={0}
      role="button"
      onKeyDown={showFullMovie}
      onClick={showFullMovie}
      // CSS classes to trigger animations
      className={showMovie ? "cardContent" : "cardContent-disappear"}
    >
      {Poster !== "N/A" && (
        <img
          tabIndex={0}
          role="button"
          onKeyDown={showFullMovie}
          onClick={showFullMovie}
          className="poster"
          src={Poster}
          alt={Title}
        />
      )}
      {imdbID !== "N/A" && Poster === "N/A" && (
        <ImageMajor onClick={showFullMovie} className="poster" />
      )}
      &nbsp;
      <p
        tabIndex={0}
        role="button"
        onKeyDown={showFullMovie}
        onClick={showFullMovie}
      >
        {`${Title} ${Year !== "N/A" ? `(${Year})` : ""}`}
      </p>
      {imdbID !== "N/A" && (
        <>
          <div className="buttonSpacing" />
          <div>
            <Button primary disabled={isDisabled} onClick={addNominationToList}>
              +
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default MovieCard;
