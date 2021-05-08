/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Button } from "@shopify/polaris";
import { useDispatch, useSelector } from "react-redux";
import INomination from "../../../models/interfaces/Nomination";
import { RootState } from "../../../reducers";
import ReduxActions from "../../../models/classes/ReduxActions";
import "./NominationCard.css";

const reduxActions = new ReduxActions();

const NominationCard = (props: INomination): JSX.Element => {
  const { Title, Year } = props;
  const nominationList = useSelector(
    (state: RootState) => state.nominationList,
  );
  const [showNomination, setShowNomination] = useState({ appear: false, delete: false });
  const dispatch = useDispatch();

  useEffect(() => {
    if (showNomination.delete) {
      dispatch(reduxActions.removeNomination(props));
      window.localStorage.setItem("nominations", JSON.stringify(nominationList));
      setTimeout(() => {
        dispatch(reduxActions.changeNominationList());
      }, 200);
    } else {
      setTimeout(() => {
        setShowNomination({ appear: true, delete: false });
      }, 200);
    }
  }, [showNomination]);

  const removeNominationFromList = (): void => {
    setShowNomination({ appear: false, delete: true });
  };

  return (
    <li className={showNomination.appear ? "nominationCard" : "nominationCard-disappear"}>
      <div className="nominationCard">
        {`${Title} (${Year})`}
        <div className="spacing" />
        <Button
          destructive
          onClick={removeNominationFromList}
        >
          -
        </Button>
      </div>
    </li>
  );
};

export default NominationCard;
