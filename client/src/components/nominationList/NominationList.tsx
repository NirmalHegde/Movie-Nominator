/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Card } from "@shopify/polaris";
import { useDispatch, useSelector } from "react-redux";
import NominationCard from "./nominationCard/NominationCard";
import { RootState } from "../../reducers";
import "./NominationList.css";
import ReduxActions from "../../models/classes/ReduxActions";

const reduxActions = new ReduxActions();

const NominationList: React.FC = (): JSX.Element => {
  const nominationList = useSelector(
    (state: RootState) => state.nominationList,
  );
  const shouldNominationListUpdate = useSelector(
    (state: RootState) => state.nominationListTrigger,
  );
  const [componentNominationList, setComponentNominationList] = useState(
    nominationList,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    setComponentNominationList(nominationList);
    if (nominationList.length === 5) {
      dispatch(reduxActions.showSuccessBanner(true));
    } else {
      dispatch(reduxActions.showSuccessBanner(false));
      dispatch(reduxActions.showErrorBanner(false));
    }
  }, [shouldNominationListUpdate]);

  return (
    <div className="nominationListRoot">
      <div className="border">
        <Card sectioned>
          <div>
            <h1 className="nominationsTitle">Your Nominations</h1>
            {componentNominationList.length > 0 && (
              <ul>
                {componentNominationList.map((nomination, index) => {
                  return (
                    <>
                      <NominationCard
                        key={nomination.imdbID}
                        Title={nomination.Title}
                        imdbID={nomination.imdbID}
                      />
                      {index !== componentNominationList.length - 1 && <br />}
                    </>
                  );
                })}
              </ul>
            )}
            {componentNominationList.length < 1 && <p className="nominationsInit">No nominations currently</p>}
          </div>
        </Card>
      </div>
    </div>
  );
};
export default NominationList;
