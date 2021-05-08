import { Modal } from "@shopify/polaris";
import { ImageMajor } from "@shopify/polaris-icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReduxActions from "../../models/classes/ReduxActions";
import IModalAssets from "../../models/interfaces/ModalAssets";
import { RootState } from "../../reducers";
import assets from "./assets";
import "./MovieInfo.css";

const reduxActions = new ReduxActions();

const MovieInfo: React.FC = (): JSX.Element => {
  const movie = useSelector((state: RootState) => state.fullMovie);
  const showModal = useSelector((state: RootState) => state.fullMovieTrigger);
  const shouldCheckDisabled = useSelector(
    (state: RootState) => state.nominationListTrigger,
  );
  const nominationList = useSelector(
    (state: RootState) => state.nominationList,
  );
  const [isDisabled, setIsDisabled] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const result = nominationList.some((nomination) => {
      return nomination.imdbID === movie.imdbID;
    });
    setIsDisabled(result);
  }, [shouldCheckDisabled, movie.imdbID, nominationList]);

  const nominateMovie = (): void => {
    dispatch(reduxActions.showFullMovie(false));
    if (nominationList.length < 5) {
      dispatch(
        reduxActions.addNomination({ Title: movie.Title, imdbID: movie.imdbID, Year: movie.Year }),
      );
      window.localStorage.setItem(
        "nominations",
        JSON.stringify(nominationList),
      );
      dispatch(reduxActions.changeNominationList());
    } else {
      dispatch(reduxActions.showErrorBanner(true));
    }
  };

  return (
    <Modal
      open={showModal}
      title={`${movie.Title} (${movie.Year})`}
      primaryAction={{
        content: "Nominate",
        disabled: isDisabled,
        onAction: nominateMovie,
      }}
      onClose={() => dispatch(reduxActions.showFullMovie(false))}
    >
      <Modal.Section>
        <div className="titleSection">
          {movie.Poster !== "N/A" && (
            <img alt={movie.Title} src={movie.Poster} />
          )}
          {movie.Poster === "N/A" && <ImageMajor />}
        </div>
      </Modal.Section>
      <Modal.Section>
        <div className="infoParent">
          <div className="spacing">
            {movie.Genre !== "N/A" && (
              <div className="basicInfo">
                <h2>Genre:&nbsp;</h2>
                <h3>{movie.Genre}</h3>
              </div>
            )}
            <div className="basicInfo">
              <h2>Released:&nbsp;</h2>
              <h3>{movie.Released}</h3>
            </div>
            {movie.Runtime !== "N/A" && (
              <div className="basicInfo">
                <h2>Runtime:&nbsp;</h2>
                <h3>{movie.Runtime}</h3>
              </div>
            )}
          </div>
          <div className="spacing" />
          {movie.Rated !== "N/A" && (
            <img
              className="rating"
              alt={movie.Rated}
              src={assets[movie.Rated as keyof IModalAssets]}
            />
          )}
        </div>
      </Modal.Section>
      <Modal.Section>
        <div className="basicInfo">
          <h2>Plot:&nbsp;</h2>
          <h3>{movie.Plot}</h3>
        </div>
      </Modal.Section>
      {movie.Ratings.length > 0 && (
        <>
          <Modal.Section>
            <div className="critiques">
              {movie.Ratings.map((rating) => {
                return (
                  <div>
                    <img
                      className="critiques"
                      alt={rating.Source}
                      src={assets[rating.Source as keyof IModalAssets]}
                    />
                    <h3>{`: ${rating.Value}`}</h3>
                    &nbsp;
                  </div>
                );
              })}
            </div>
          </Modal.Section>
        </>
      )}
      <Modal.Section>
        {movie.Production !== "N/A" && (
          <div className="basicInfo">
            <h2>Production:&nbsp;</h2>
            <h3>{movie.Production}</h3>
          </div>
        )}
        {movie.Director !== "N/A" && (
          <div className="basicInfo">
            <h2>Director:&nbsp;</h2>
            <h3>{movie.Director}</h3>
          </div>
        )}
        {movie.Writer !== "N/A" && (
          <div className="basicInfo">
            <h2>Writers:&nbsp;</h2>
            <h3>{movie.Writer}</h3>
          </div>
        )}
        {movie.Actors !== "N/A" && (
          <div className="basicInfo">
            <h2>Actors:&nbsp;</h2>
            <h3>{movie.Actors}</h3>
          </div>
        )}
      </Modal.Section>
    </Modal>
  );
};

export default MovieInfo;
