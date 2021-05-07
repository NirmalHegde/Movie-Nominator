import { GraphQLObjectType, GraphQLString } from 'graphql'

const BaseMovie = new GraphQLObjectType({
  name: 'BaseMovie',
  fields: () => ({
    Title: {
      type: GraphQLString,
    },
    Year: {
      type: GraphQLString,
    },
    imdbID: {
      type: GraphQLString,
    },
    Type: {
      type: GraphQLString,
    },
    Poster: {
      type: GraphQLString,
    },
  }),
})

export default BaseMovie
