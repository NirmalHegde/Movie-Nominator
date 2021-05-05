/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Button, Card } from "@shopify/polaris";
import { useDispatch, useSelector } from "react-redux";
import IBaseMovie from "../../../../models/BaseMovie";
import ReduxActions from "../../../../actions";
import { RootState } from "../../../../reducers";

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
  const shouldCheckDisabled = useSelector((state: RootState) => state.nominationListTrigger);

  const addNominationToList = (): void => {
    if (nominationList.length < 5) {
      dispatch(reduxActions.addNomination({ Title, imdbID }));
      window.localStorage.setItem("nominations", JSON.stringify(nominationList));
      dispatch(reduxActions.changeNominationList());
    }
  };

  useEffect(() => {
    const result = nominationList.some((nomination) => {
      return nomination.imdbID === imdbID;
    });

    setIsDisabled(result);
  }, [shouldCheckDisabled]);

  return (
    <div style={{ width: "40vw" }}>
      <Card sectioned>
        {imdbID !== "N/A" && <img src={Poster} alt={Title} />}
        <p>{`${Title} ${Year !== "N/A" ? `(${Year})` : ""}`}</p>
        {imdbID !== "N/A" && (
          <Button
            disabled={isDisabled}
            onClick={addNominationToList}
          >
            Nominate
          </Button>
        )}
      </Card>
    </div>
  );
};

export default MovieCard;
