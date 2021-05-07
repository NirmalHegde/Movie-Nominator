/* eslint-disable semi  */
export default interface IFullMovie {
  Title: string;
  Year: string;
  imdbID: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Poster: string;
  Ratings: [
    {
      Source: string;
      Value: string;
    }
  ];
  Production: string;
}
