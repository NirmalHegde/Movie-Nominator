/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Button } from "@shopify/polaris";
import { useDispatch, useSelector } from "react-redux";
import INomination from "../../../models/interfaces/Nomination";
import { RootState } from "../../../reducers";
import reduxActions from "../../../models/classes/ReduxActions";
import "./NominationCard.css";

const NominationCard = (props: INomination): JSX.Element => {
  const { Title, Year } = props;
  const nominationList = useSelector(
    (state: RootState) => state.nominationList,
  );
  const [showNomination, setShowNomination] = useState({ appear: false, delete: false });
  const dispatch = useDispatch();

  // animation on component mount
  useEffect(() => {
    setTimeout(() => {
      setShowNomination({ appear: true, delete: false });
    }, 200);
  }, []);

  // side effect to manage the deletion of nomination and allow for animations
  useEffect(() => {
    if (showNomination.delete) {
      dispatch(reduxActions.removeNomination(props));
      if (nominationList.length > 1) {
        window.localStorage.setItem("nominations", JSON.stringify(nominationList));
      } else {
        window.localStorage.removeItem("nominations");
      }
      setTimeout(() => {
        // allow component to fade out before updating list
        dispatch(reduxActions.changeNominationList());
      }, 300);
    }
  }, [showNomination]);

  // function to remove nomination
  const removeNominationFromList = (): void => {
    setShowNomination({ appear: false, delete: true });
  };

  return (
    <li className={showNomination.appear ? "nominationCard" : "nominationCard-disappear"}>
      <div className="nominationCard">
        {`${Title} (${Year})`}
        <div className="spacing" />
        <div>
          <Button
            destructive
            onClick={removeNominationFromList}
          >
            -
          </Button>
        </div>
      </div>
    </li>
  );
};

export default NominationCard;
