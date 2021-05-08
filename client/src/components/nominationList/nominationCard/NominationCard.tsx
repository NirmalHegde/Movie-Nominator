import React, { useRef } from "react";
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
  const nominationCardRef = useRef<any>();
  nominationCardRef.current = "nominationCard-show";
  const dispatch = useDispatch();

  const removeNominationFromList = (): void => {
    nominationCardRef.current = "nominationCard-disappear";
    setTimeout(() => {
      dispatch(reduxActions.removeNomination(props));
      window.localStorage.setItem("nominations", JSON.stringify(nominationList));
      dispatch(reduxActions.changeNominationList());
    }, 300);
  };

  return (
    <li className={nominationCardRef.current}>
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
