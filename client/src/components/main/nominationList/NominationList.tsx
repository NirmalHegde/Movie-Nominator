/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Card } from "@shopify/polaris";
import { useSelector } from "react-redux";
import NominationCard from "./nominationCard/NominationCard";
import { RootState } from "../../../reducers";
import "./NominationList.css";

const NominationList = (): JSX.Element => {
  const nominationList = useSelector(
    (state: RootState) => state.nominationList,
  );
  const shouldNominationListUpdate = useSelector(
    (state: RootState) => state.nominationListTrigger,
  );
  const [componentNominationList, setComponentNominationList] = useState(
    nominationList,
  );

  useEffect(() => {
    setComponentNominationList(nominationList);
  }, [shouldNominationListUpdate]);

  return (
    <div className="nominationListRoot">
      <Card sectioned>
        <div>
          <h1>Your Nominations</h1>
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
    </div>
  );
};
export default NominationList;
