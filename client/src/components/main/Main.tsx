/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Banner } from "@shopify/polaris";
import { useDispatch, useSelector } from "react-redux";

import Search from "./search/Search";
import "./Main.css";
import MovieList from "./movieList/MovieList";
import NominationList from "./nominationList/NominationList";
import MovieInfo from "./movieInfo/MovieInfo";
import BannerStyle from "../../models/enums/BannerStyleEnum";
import { RootState } from "../../reducers";
import ReduxActions from "../../models/classes/ReduxActions";

require("dotenv").config();

const reduxActions = new ReduxActions();

const Main = (): JSX.Element => {
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
    <div className="root">
      <h1 className="title">🎉 Welcome to the Shoppies! 🎉</h1>
      <h2 className="title">
        Nominate your favourite films for the esteemed Shoscars, given out every
        year at the annual Shoppies Convention in Ottawa, Ontario!
      </h2>
      <br />
      <Search />
      <div className="content">
        <MovieList />
        <NominationList />
      </div>
      {successBanner && (
        <Banner
          status={BannerStyle.Success}
          title="🎉 Success! You have made 5 nominations! 🎉"
          onDismiss={() => setSuccessBanner(false)}
        >
          Check over your submissions and submit to give your favourite movies a
          chance to win!
        </Banner>
      )}
      {errorBanner && (
        <Banner
          status={BannerStyle.Error}
          title="You already have 5 nominations!"
          onDismiss={() => dispatch(reduxActions.showErrorBanner(false))}
        >
          If you would like to add another nomination, please remove a
          nomination you have currently.
        </Banner>
      )}
      <MovieInfo />
    </div>
  );
};

export default Main;
