import { gql } from "@apollo/client";

export const MOVIE_SEARCH = gql`
	query baseMovieSearch($title: String!) {
		baseMovieSearch(title: $title) {
			Title
		}
	}
`
