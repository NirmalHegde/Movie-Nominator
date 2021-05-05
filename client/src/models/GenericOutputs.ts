/* eslint-disable no-mixed-spaces-and-tabs */
import { OptionDescriptor } from "@shopify/polaris/dist/types/latest/src/components/OptionList";
import IBaseMovie from "./BaseMovie";
import INomination from "./Nomination";

const initMovieList: IBaseMovie[] = [
  {
    Title: "Start by searching for your favourite movies above!",
    Year: "N/A",
    imdbID: "N/A",
    Poster: "N/A",
  },
];

const baseOptions: OptionDescriptor[] = [
  {
    value: "Example",
    label: "Example: Guardians of the Galaxy",
    disabled: true,
  },
];

const initNominationList: INomination[] = [{
  Title: "No nominations currently",
  imdbID: "N/A",
}];

const errorOptionsArray: OptionDescriptor[] = [
  {
    value: "Error",
    label: "Unable to find movies matching this search query",
    disabled: true,
  },
];

const errorMovieList: IBaseMovie[] = [
  {
    Title: "Unable to find movies matching this search query",
    Year: "N/A",
    imdbID: "N/A",
    Poster: "N/A",
  },
];

export default class GenericOutputs {
	public initMovieList: IBaseMovie[];

	public initOptions: OptionDescriptor[];

	public initNominationList: INomination[];

	public errorOptions: OptionDescriptor[];

	public errorMovieList: IBaseMovie[];

	constructor() {
	  this.initMovieList = initMovieList;
	  this.initOptions = baseOptions;
	  this.initNominationList = initNominationList;
	  this.errorOptions = errorOptionsArray;
	  this.errorMovieList = errorMovieList;
	}
}
