/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Banner } from "@shopify/polaris";
import { useDispatch, useSelector } from "react-redux";
import BannerStyle from "../../../models/enums/BannerStyleEnum";
import { RootState } from "../../../reducers";
import reduxActions from "../../../models/classes/ReduxActions";
import "./NotificationBanner.css";

const Notification: React.FC = (): JSX.Element => {
  const successBanner = useSelector(
    (state: RootState) => state.successBannerTrigger,
  );

  const dispatch = useDispatch();

  return (
    <div className="notificationRoot">
      {/* animation for banner */}
      <div className={successBanner ? "successBanner-show" : "successBanner"}>
        <Banner
          status={BannerStyle.Success}
          title="🎉 Success! You have made 5 nominations! 🎉"
          onDismiss={() => dispatch(reduxActions.showSuccessBanner(false))}
        >
          Submit your results to give your favourite movies a chance to win!
        </Banner>
      </div>
    </div>
  );
};

export default Notification;
