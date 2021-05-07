import { GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql'

const FullMovie = new GraphQLObjectType({
  name: 'FullMovie',
  fields: () => ({
    Title: {
      type: GraphQLString,
    },
    Year: {
      type: GraphQLString,
    },
		Rated: {
			type: GraphQLString,
		},
    Released: {
      type: GraphQLString,
    },
    Runtime: {
      type: GraphQLString,
    },
    Genre: {
      type: GraphQLString,
    },
		Director: {
			type: GraphQLString,
		},
		Writer: {
			type: GraphQLString,
		},
		Actors: {
			type: GraphQLString,
		},
		Plot: {
			type: GraphQLString,
		},
		Poster: {
			type: GraphQLString,
		},
		Ratings: {
			type: GraphQLList(GraphQLString),
		},
		Production: {
			type: GraphQLString,
		}
  }),
})

export default FullMovie