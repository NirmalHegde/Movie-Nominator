import { GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql'

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