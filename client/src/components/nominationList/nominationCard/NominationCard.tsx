/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  SyntheticEvent, useCallback, useEffect, useState,
} from "react";
import { Button } from "@shopify/polaris";
import { useLazyQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import INomination from "../../../models/interfaces/Nomination";
import { RootState } from "../../../reducers";
import reduxActions from "../../../models/classes/ReduxActions";
import { FULL_MOVIE } from "../../../graphQL/queries";
import "./NominationCard.css";

const NominationCard = (props: INomination): JSX.Element => {
  const { Title, Year, imdbID } = props;
  const nominationList = useSelector(
    (state: RootState) => state.nominationList,
  );
  const [showNomination, setShowNomination] = useState({
    appear: false,
    delete: false,
  });
  const [triggerModal, setTriggerModal] = useState(false);
  const [fullMovie, { data }] = useLazyQuery(FULL_MOVIE, {
    variables: { id: imdbID },
  });
  const dispatch = useDispatch();

  // animation on component mount
  useEffect(() => {
    setTimeout(() => {
      setShowNomination({ appear: true, delete: false });
    }, 200);
  }, []);

  // side effect to open modal after data has been received from graphql
  useEffect(() => {
    if (data) {
      dispatch(reduxActions.setFullMovie(data.fullMovie));
      dispatch(reduxActions.showFullMovie(true));
    }
  }, [data, triggerModal]);

  // side effect to manage the deletion of nomination and allow for animations
  useEffect(() => {
    if (showNomination.delete) {
      dispatch(reduxActions.removeNomination(props));
      if (nominationList.length > 1) {
        window.localStorage.setItem(
          "nominations",
          JSON.stringify(nominationList),
        );
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
    <li
      className={
        showNomination.appear ? "nominationCard" : "nominationCard-disappear"
      }
    >
      <div
        tabIndex={0}
        role="button"
        onKeyDown={showFullMovie}
        onClick={showFullMovie}
        className="nominationCard"
      >
        {`${Title} (${Year})`}
        <div
          tabIndex={0}
          role="button"
          onKeyDown={showFullMovie}
          onClick={showFullMovie}
          className="spacing"
        />
        <div>
          <Button destructive onClick={removeNominationFromList}>
            -
          </Button>
        </div>
      </div>
    </li>
  );
};

export default NominationCard;
