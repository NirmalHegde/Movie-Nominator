"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const BaseMovie = new graphql_1.GraphQLObjectType({
    name: 'BaseMovie',
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
        Type: {
            type: graphql_1.GraphQLString,
        },
        Poster: {
            type: graphql_1.GraphQLString,
        },
    }),
});
exports.default = BaseMovie;
//# sourceMappingURL=BaseMovie.js.map