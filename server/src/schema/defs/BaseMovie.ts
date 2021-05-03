import { GraphQLObjectType, GraphQLString } from "graphql";

const BaseMovie = new GraphQLObjectType({
  name: "Movies",
  fields: () => ({
    Title: {
      type: GraphQLString
    },
		Year: {
			type: GraphQLString
		},
		imdbID: {
			type: GraphQLString
		},
		Poster: {
			type: GraphQLString
		}
  }),
});

export default BaseMovie;
