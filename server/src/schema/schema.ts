import axios from 'axios'
import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
} from 'graphql'
import { IBaseMovie } from '../models/baseMovie'
import BaseMovie from './defs/BaseMovie'

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    baseMovieSearch: {
      type: new GraphQLList(BaseMovie),
      args: { title: { type: GraphQLString } },
      async resolve(parent, args) {
        const result: IBaseMovie[] = await axios
          .get(
            `http://www.omdbapi.com/?s=${args.title}&apikey=${process.env.API_KEY}`,
          )
          .then((res) => res.data.Search)
          .catch((err) => console.log(err))
        
        return result
      },
    },
  },
})

export default new GraphQLSchema({ query: RootQuery })
