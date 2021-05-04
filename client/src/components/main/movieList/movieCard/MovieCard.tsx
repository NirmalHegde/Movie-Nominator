import React from "react";
import { Card } from "@shopify/polaris";
import IBaseMovie from "../../../../models/BaseMovie";

const MovieCard = (props: IBaseMovie): JSX.Element => {
  const { Title } = props;
  return (
    <div style={{ width: "40vw" }}>
      <Card sectioned>
        <p>{Title}</p>
      </Card>
    </div>
  );
};

export default MovieCard;
