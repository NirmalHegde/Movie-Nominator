import React from "react";
import { Button } from "@shopify/polaris";
import { useDispatch, useSelector } from "react-redux";
import INomination from "../../../models/interfaces/Nomination";
import { RootState } from "../../../reducers";
import ReduxActions from "../../../models/classes/ReduxActions";
import "./NominationCard.css";

const reduxActions = new ReduxActions();

const NominationCard = (props: INomination): JSX.Element => {
  const { Title } = props;
  const nominationList = useSelector(
    (state: RootState) => state.nominationList,
  );
  const dispatch = useDispatch();

  const removeNominationFromList = (): void => {
    dispatch(reduxActions.removeNomination(props));
    window.localStorage.setItem("nominations", JSON.stringify(nominationList));
    dispatch(reduxActions.changeNominationList());
  };

  return (
    <li>
      <div className="nominationCard">
        {Title}
        <div className="spacing" />
        <Button
          destructive
          onClick={removeNominationFromList}
        >
          Remove
        </Button>
      </div>
    </li>
  );
};

export default NominationCard;
