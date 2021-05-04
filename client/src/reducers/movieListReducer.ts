import IBaseMovie from "../models/BaseMovie";

const initMovieList: IBaseMovie[] = [
  {
    Title: "Start by searching for your favourite movies above!",
    Year: "N/A",
    imdbID: "N/A",
    Poster: "N/A",
  },
];

const movieListReducer = (state = initMovieList, action: any): any => {
  switch (action.type) {
  case "SETMOVIES":
    return action.payload;
  default:
    return state;
  }
};

export default movieListReducer;
