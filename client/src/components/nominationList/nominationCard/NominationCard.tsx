import React from "react";
import { Button, Card } from "@shopify/polaris";
import { useDispatch, useSelector } from "react-redux";
import INomination from "../../../models/interfaces/Nomination";
import { RootState } from "../../../reducers";
import ReduxActions from "../../../models/classes/ReduxActions";

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
    <div>
      <Card sectioned>
        <p>{Title}</p>
        <Button
          onClick={removeNominationFromList}
        >
          Remove
        </Button>
      </Card>
    </div>
  );
};

export default NominationCard;
