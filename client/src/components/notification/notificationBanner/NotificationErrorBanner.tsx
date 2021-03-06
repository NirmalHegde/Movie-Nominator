/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Banner } from "@shopify/polaris";
import { useDispatch, useSelector } from "react-redux";
import "./NotificationBanner.css";
import reduxActions from "../../../models/classes/ReduxActions";
import { RootState } from "../../../reducers";
import BannerStyle from "../../../models/enums/BannerStyleEnum";

const Notification: React.FC = (): JSX.Element => {
  const errorBanner = useSelector(
    (state: RootState) => state.errorBannerTrigger,
  );
  const dispatch = useDispatch();

  return (
    <div className="notificationRoot">
      {/* animation for banner */}
      <div className={errorBanner ? "errorBanner-show" : "errorBanner"}>
        <Banner
          status={BannerStyle.Error}
          title="You already have 5 nominations!"
          onDismiss={() => dispatch(reduxActions.showErrorBanner(false))}
        >
          If you would like to add another nomination, please remove a
          nomination you have currently.
        </Banner>
      </div>
    </div>
  );
};

export default Notification;
