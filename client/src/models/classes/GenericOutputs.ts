/* eslint-disable no-mixed-spaces-and-tabs */
import { OptionDescriptor } from "@shopify/polaris/dist/types/latest/src/components/OptionList";
import IFullMovie from "../interfaces/FullMovie";
import INomination from "../interfaces/Nomination";

// Generic outputs to fill options
class GenericOutputs {
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
	  Year: "N/A",
	}];

	public errorOptions: OptionDescriptor[] = [
	  {
	    value: "Error",
	    label: "Unable to find movies matching this search query",
	    disabled: true,
	  },
	];

	public initFullMovie: IFullMovie = {
	  Title: "N/A",
	  Year: "N/A",
	  imdbID: "N/A",
	  Rated: "N/A",
	  Released: "N/A",
	  Runtime: "N/A",
	  Genre: "N/A",
	  Director: "N/A",
	  Writer: "N/A",
	  Actors: "N/A",
	  Plot: "N/A",
	  Poster: "N/A",
	  Ratings: [{
	    Source: "N/A",
	    Value: "N/A",
	  }],
	  Production: "N/A",
	}
}

const genericOutputs = new GenericOutputs();

export default genericOutputs;
