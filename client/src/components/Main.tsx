import React from "react";

import Search from "./search/Search";
import "./Main.css";
import MovieList from "./movieList/MovieList";
import NominationList from "./nominationList/NominationList";
import Notification from "./notification/Notification";
import MovieInfo from "./movieInfo/MovieInfo";

require("dotenv").config();

const Main: React.FC = (): JSX.Element => {
  return (
    <div>
      <Notification />
      <MovieInfo />
      <div className="root">
        <div className="heading">
          <div className="title">
            <h1>🎬&nbsp;</h1>
            <h1>Welcome to the Shoppies!</h1>
            <h1>&nbsp;🎬</h1>
          </div>
        </div>
        <br />
        <div className="heading">
          <h2 className="subtitle">
            Nominate your favourite films for the esteemed Shoscars, given out every
            year at the annual Shoppies Convention in Ottawa, Ontario!
          </h2>
        </div>
        <br />
        <Search />
        <div className="content">
          <MovieList />
          <NominationList />
        </div>
      </div>
    </div>
  );
};

export default Main;
