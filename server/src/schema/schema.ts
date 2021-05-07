import axios from 'axios'
import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
} from 'graphql'
import { IBaseMovie } from '../models/baseMovie'
import { IFullMovie } from '../models/fullMovie'
import BaseMovie from './defs/BaseMovie'
import FullMovie from './defs/FullMovie'

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
    fullMovie: {
      type: FullMovie,
      args: { id: { type: GraphQLString }},
      async resolve(parent, args) {
        const result: IFullMovie[] = await axios
          .get(
            `http://www.omdbapi.com/?i=${args.id}&apikey=${process.env.API_KEY}`,
          )
          .then((res) => res.data)
          .catch((err) => console.log(err))
        
        return result
      },
    },
  },
})

export default new GraphQLSchema({ query: RootQuery })
