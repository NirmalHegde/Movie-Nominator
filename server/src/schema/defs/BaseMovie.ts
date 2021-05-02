import { GraphQLObjectType, GraphQLString } from "graphql";

const BaseMovie = new GraphQLObjectType({
  name: "Movies",
  fields: () => ({
    Title: {
      type: GraphQLString,
    },
  }),
});

export default BaseMovie;
