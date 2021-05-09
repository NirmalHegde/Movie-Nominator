/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Card } from "@shopify/polaris";
import { useDispatch, useSelector } from "react-redux";
import NominationCard from "./nominationCard/NominationCard";
import { RootState } from "../../reducers";
import "./NominationList.css";
import reduxActions from "../../models/classes/ReduxActions";

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

  // side effect to check if nomination list has reached 5
  // show success banner if it has
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
            <h1 className="nominationsTitle">Nominations</h1>
            {componentNominationList.length > 0 && (
              <ul className="nominationParent">
                {componentNominationList.map((nomination) => {
                  return (
                    <>
                      <NominationCard
                        key={nomination.imdbID}
                        Year={nomination.Year}
                        Title={nomination.Title}
                        imdbID={nomination.imdbID}
                      />
                    </>
                  );
                })}
              </ul>
            )}

            {/* default when no nominations */}
            {componentNominationList.length < 1 && (
              <p className="nominationsInit">No nominations currently</p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};
export default NominationList;
