/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Card } from "@shopify/polaris";
import { useSelector } from "react-redux";
import NominationCard from "./nominationCard/NominationCard";
import { RootState } from "../../../reducers";

const NominationList = (): JSX.Element => {
  const nominationList = useSelector((state: RootState) => state.nominationList);
  const shouldNominationListUpdate = useSelector((state: RootState) => state.nominationListTrigger);
  const [componentNominationList, setComponentNominationList] = useState(nominationList);

  useEffect(() => {
    setComponentNominationList(nominationList);
  }, [shouldNominationListUpdate]);

  return (
    <Card sectioned>
      <div style={{ width: "40vw" }}>
        {componentNominationList.map((nomination) => {
          return (
            <>
              <NominationCard
                key={nomination.imdbID}
                Title={nomination.Title}
                imdbID={nomination.imdbID}
              />
            </>
          );
        })}
      </div>
    </Card>
  );
};
export default NominationList;
