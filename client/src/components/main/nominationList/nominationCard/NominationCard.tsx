import React from "react";
import { Card } from "@shopify/polaris";
import IBaseMovie from "../../../../models/BaseMovie";

const NominationCard = (props: IBaseMovie): JSX.Element => {
  const {
    Title, Year, Poster,
  } = props;
  return (
    <div style={{ width: "40vw" }}>
      <Card sectioned>
        {Year !== "N/A" && <img src={Poster} alt={Title} />}
        <p>
          {`${Title} ${Year !== "N/A" ? `(${Year})` : ""}`}
        </p>
      </Card>
    </div>
  );
};

export default NominationCard;
