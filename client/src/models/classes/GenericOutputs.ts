/* eslint-disable no-mixed-spaces-and-tabs */
import { OptionDescriptor } from "@shopify/polaris/dist/types/latest/src/components/OptionList";
import IBaseMovie from "../interfaces/BaseMovie";
import INomination from "../interfaces/Nomination";

export default class GenericOutputs {
	public initMovieList: IBaseMovie[] = [
	  {
	    Title: "Start by searching for your favourite movies above!",
	    Year: "N/A",
	    imdbID: "N/A",
	    Poster: "N/A",
	  },
	];;

	public initOptions: OptionDescriptor[] = [
	  {
	    value: "Example",
	    label: "Example: Guardians of the Galaxy",
	    disabled: true,
	  },
	];

	public initNominationList: INomination[] = [{
	  Title: "No nominations currently",
	  imdbID: "N/A",
	}];

	public errorOptions: OptionDescriptor[] = [
	  {
	    value: "Error",
	    label: "Unable to find movies matching this search query",
	    disabled: true,
	  },
	];

	public errorMovieList: IBaseMovie[] = [
	  {
	    Title: "Unable to find movies matching this search query",
	    Year: "N/A",
	    imdbID: "N/A",
	    Poster: "N/A",
	  },
	];
}
