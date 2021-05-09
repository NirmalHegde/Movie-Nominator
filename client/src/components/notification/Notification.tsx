/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import NotificationErrorBanner from "./notificationBanner/NotificationErrorBanner";
import NotificationSuccessBanner from "./notificationBanner/NotificationSuccessBanner";
import "./Notification.css";

const Notification: React.FC = (): JSX.Element => {
  return (
    <div className="notificationRoot">
      <NotificationErrorBanner />
      <NotificationSuccessBanner />
    </div>
  );
};

export default Notification;
