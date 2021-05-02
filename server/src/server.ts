const express = require("express");
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = require("graphql");
const { graphqlHTTP } = require("express-graphql");
const axios = require("axios");
import { IBaseMovie } from '../models/baseMovie';
require("dotenv").config();

const app = express();
const port: string = process.env.PORT || "5000";

const MovieType: typeof GraphQLObjectType = new GraphQLObjectType({
  name: "Movies",
  fields: () => ({
    Title: {
      type: GraphQLString,
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    baseMovieSearch: {
      type: new GraphQLList(MovieType),
      args: { title: { type: GraphQLString } },
      async resolve(parent, args) {
        const result: IBaseMovie = await axios.get(`http://www.omdbapi.com/?s=${args.title}&apikey=42e521f5`)
          .then((res) => res.data.Search)
          .catch((err) => console.log(err));
        return result;
      },
    },
  },
});

const schema: typeof GraphQLSchema = new GraphQLSchema({ query: RootQuery });

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(port, (err) => {
  if (err) {
    return console.error(err);
  }
  return console.log(`server is listening on ${port}`);
});
