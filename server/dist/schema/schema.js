"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const graphql_1 = require("graphql");
const BaseMovie_1 = __importDefault(require("./defs/BaseMovie"));
const FullMovie_1 = __importDefault(require("./defs/FullMovie"));
const RootQuery = new graphql_1.GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        baseMovieSearch: {
            type: new graphql_1.GraphQLList(BaseMovie_1.default),
            args: { title: { type: graphql_1.GraphQLString } },
            resolve(parent, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    const result = yield axios_1.default
                        .get(`http://www.omdbapi.com/?s=${args.title}&apikey=${process.env.API_KEY}`)
                        .then((res) => res.data.Search)
                        .catch((err) => console.log(err));
                    return result;
                });
            },
        },
        fullMovie: {
            type: FullMovie_1.default,
            args: { id: { type: graphql_1.GraphQLString } },
            resolve(parent, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    const result = yield axios_1.default
                        .get(`http://www.omdbapi.com/?i=${args.id}&apikey=${process.env.API_KEY}`)
                        .then((res) => res.data)
                        .catch((err) => console.log(err));
                    return result;
                });
            },
        },
    },
});
exports.default = new graphql_1.GraphQLSchema({ query: RootQuery });
//# sourceMappingURL=schema.js.map