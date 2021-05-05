/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Button } from "@shopify/polaris";
import { ImageMajor } from "@shopify/polaris-icons";
import { useDispatch, useSelector } from "react-redux";
import IBaseMovie from "../../../../models/interfaces/BaseMovie";
import ReduxActions from "../../../../models/classes/ReduxActions";
import { RootState } from "../../../../reducers";
import "./MovieCard.css";

const reduxActions = new ReduxActions();

const MovieCard = (props: IBaseMovie): JSX.Element => {
  const {
    Title, Year, Poster, imdbID,
  } = props;
  const nominationList = useSelector(
    (state: RootState) => state.nominationList,
  );
  const [isDisabled, setIsDisabled] = useState(false);
  const dispatch = useDispatch();
  const shouldCheckDisabled = useSelector(
    (state: RootState) => state.nominationListTrigger,
  );

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

  useEffect(() => {
    const result = nominationList.some((nomination) => {
      return nomination.imdbID === imdbID;
    });
    setIsDisabled(result);
  }, [shouldCheckDisabled]);

  return (
    <div className="cardContent">
      {Poster !== "N/A" && <img className="poster" src={Poster} alt={Title} />}
      {imdbID !== "N/A" && Poster === "N/A" && <ImageMajor className="poster" />}
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
