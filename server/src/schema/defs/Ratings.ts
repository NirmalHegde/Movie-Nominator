import { GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql'

// format of ratings for full movie
const Ratings = new GraphQLObjectType({
  name: 'Ratings',
  fields: () => ({
    Source: {
      type: GraphQLString,
    },
    Value: {
      type: GraphQLString,
    },
  }),
})

export default Ratings
