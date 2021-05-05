/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Banner } from "@shopify/polaris";
import { useDispatch, useSelector } from "react-redux";
import ReduxActions from "../../../models/classes/ReduxActions";
import BannerStyle from "../../../models/enums/BannerStyleEnum";
import { RootState } from "../../../reducers";
import "./Notification.css";

const reduxActions = new ReduxActions();

const Notification = (): JSX.Element => {
  const checkNominations = useSelector(
    (state: RootState) => state.nominationListTrigger,
  );
  const nominationList = useSelector(
    (state: RootState) => state.nominationList,
  );
  const errorBanner = useSelector(
    (state: RootState) => state.errorBannerTrigger,
  );
  const [successBanner, setSuccessBanner] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (nominationList.length >= 5) {
      setSuccessBanner(true);
    } else {
      setSuccessBanner(false);
      dispatch(reduxActions.showErrorBanner(false));
    }
  }, [checkNominations, nominationList.length]);

  return (
    <div className="notificationRoot">
      {errorBanner && (
        <div>
          <Banner
            status={BannerStyle.Error}
            title="You already have 5 nominations!"
            onDismiss={() => dispatch(reduxActions.showErrorBanner(false))}
          >
            If you would like to add another nomination, please remove a
            nomination you have currently.
          </Banner>
        </div>
      )}
      {successBanner && (
        <div>
          <Banner
            status={BannerStyle.Success}
            title="🎉 Success! You have made 5 nominations! 🎉"
            onDismiss={() => setSuccessBanner(false)}
          >
            Check over your submissions and submit to give your favourite movies a
            chance to win!
          </Banner>
        </div>
      )}
    </div>
  );
};

export default Notification;
