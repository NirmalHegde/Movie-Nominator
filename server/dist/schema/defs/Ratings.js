"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
// format of ratings for full movie
const Ratings = new graphql_1.GraphQLObjectType({
    name: 'Ratings',
    fields: () => ({
        Source: {
            type: graphql_1.GraphQLString,
        },
        Value: {
            type: graphql_1.GraphQLString,
        },
    }),
});
exports.default = Ratings;
//# sourceMappingURL=Ratings.js.map