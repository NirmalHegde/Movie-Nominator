"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const Ratings_1 = __importDefault(require("./Ratings"));
// full movie schema
const FullMovie = new graphql_1.GraphQLObjectType({
    name: 'FullMovie',
    fields: () => ({
        Title: {
            type: graphql_1.GraphQLString,
        },
        Year: {
            type: graphql_1.GraphQLString,
        },
        imdbID: {
            type: graphql_1.GraphQLString,
        },
        Rated: {
            type: graphql_1.GraphQLString,
        },
        Released: {
            type: graphql_1.GraphQLString,
        },
        Runtime: {
            type: graphql_1.GraphQLString,
        },
        Genre: {
            type: graphql_1.GraphQLString,
        },
        Director: {
            type: graphql_1.GraphQLString,
        },
        Writer: {
            type: graphql_1.GraphQLString,
        },
        Actors: {
            type: graphql_1.GraphQLString,
        },
        Plot: {
            type: graphql_1.GraphQLString,
        },
        Poster: {
            type: graphql_1.GraphQLString,
        },
        Ratings: {
            type: graphql_1.GraphQLList(Ratings_1.default),
        },
        Production: {
            type: graphql_1.GraphQLString,
        }
    }),
});
exports.default = FullMovie;
//# sourceMappingURL=FullMovie.js.map