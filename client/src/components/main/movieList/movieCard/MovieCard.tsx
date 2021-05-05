import React from "react";
import { Button, Card } from "@shopify/polaris";
import { useDispatch, useSelector } from "react-redux";
import IBaseMovie from "../../../../models/BaseMovie";
import { addNomination, changeNominationList } from "../../../../actions";
import { RootState } from "../../../../reducers";

const MovieCard = (props: IBaseMovie): JSX.Element => {
  const {
    Title, Year, Poster, imdbID,
  } = props;
  const nominationList = useSelector(
    (state: RootState) => state.nominationList,
  );
  const dispatch = useDispatch();

  const addNominationToList = (): void => {
    dispatch(addNomination({ Title, imdbID }));
    window.localStorage.setItem("nominations", JSON.stringify(nominationList));
    dispatch(changeNominationList());
  };

  return (
    <div style={{ width: "40vw" }}>
      <Card sectioned>
        {imdbID !== "N/A" && <img src={Poster} alt={Title} />}
        <p>{`${Title} ${Year !== "N/A" ? `(${Year})` : ""}`}</p>
        {imdbID !== "N/A" && (
          <Button
            disabled={nominationList.some((nomination) => {
              return nomination.imdbID === imdbID;
            })}
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
