import React from "react";

import Search from "./search/Search";
import "./Main.css";
import MovieList from "./movieList/MovieList";
import NominationList from "./nominationList/NominationList";
import Notification from "./notification/Notification";

require("dotenv").config();

const Main = (): JSX.Element => {
  return (
    <div>
      <Notification />
      <div className="root">
        <h1 className="title">🎬 Welcome to the Shoppies! 🎬</h1>
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
      </div>
    </div>
  );
};

export default Main;
