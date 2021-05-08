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
        reduxActions.addNomination({ Title: movie.Title, imdbID: movie.imdbID }),
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
        <div className="basicInfo">
          <div>
            {movie.Genre !== "N/A" && (
              <p>
                Genre:&nbsp;
                {movie.Genre}
              </p>
            )}
            <p>
              Released:&nbsp;
              {movie.Released}
            </p>
            {movie.Runtime !== "N/A" && (
              <p>
                Runtime:&nbsp;
                {movie.Runtime}
              </p>
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
        <div>
          <p>
            Plot:&nbsp;
            {movie.Plot}
          </p>
        </div>
      </Modal.Section>
      {movie.Ratings.length > 0 && (
        <>
          <Modal.Section>
            <h1>Ratings:</h1>
            <div className="basicInfo">
              {movie.Ratings.map((rating) => {
                return (
                  <div className="basicInfo">
                    <img
                      className="critiques"
                      alt={rating.Source}
                      src={assets[rating.Source as keyof IModalAssets]}
                    />
                    <p>{`: ${rating.Value}`}</p>
                  </div>
                );
              })}
            </div>
          </Modal.Section>
        </>
      )}
      <Modal.Section>
        <div>
          {movie.Production !== "N/A" && (
            <p>
              Production:&nbsp;
              {movie.Production}
            </p>
          )}
          {movie.Director !== "N/A" && (
            <p>
              Director:&nbsp;
              {movie.Director}
            </p>
          )}
          {movie.Writer !== "N/A" && (
            <div>
              <p>Writers:&nbsp;</p>
              <p>{movie.Writer}</p>
            </div>
          )}
          {movie.Actors !== "N/A" && (
            <div>
              <p>Actors:&nbsp;</p>
              <p>{movie.Actors}</p>
            </div>
          )}
        </div>
      </Modal.Section>
    </Modal>
  );
};

export default MovieInfo;
