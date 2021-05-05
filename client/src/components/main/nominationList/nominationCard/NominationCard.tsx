import React from "react";
import { Button, Card } from "@shopify/polaris";
import { useDispatch, useSelector } from "react-redux";
import INomination from "../../../../models/Nomination";
import { RootState } from "../../../../reducers";
import { removeNomination, changeNominationList } from "../../../../actions";

const NominationCard = (props: INomination): JSX.Element => {
  const { Title } = props;
  const nominationList = useSelector(
    (state: RootState) => state.nominationList,
  );
  const dispatch = useDispatch();

  const removeNominationFromList = (): void => {
    dispatch(removeNomination(props));
    window.localStorage.setItem("nominations", JSON.stringify(nominationList));
    dispatch(changeNominationList());
  };

  return (
    <div style={{ width: "40vw" }}>
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
