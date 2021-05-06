/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import NotificationErrorBanner from "./notificationBanner/NotificationErrorBanner";
import NotificationSuccessBanner from "./notificationBanner/NotificationSuccessBanner";

const Notification = (): JSX.Element => {
  return (
    <div>
      <NotificationErrorBanner />
      <NotificationSuccessBanner />
    </div>
  );
};

export default Notification;
