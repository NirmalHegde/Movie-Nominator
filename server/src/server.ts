import { graphqlHTTP } from 'express-graphql'
import schema from './schema/schema'

const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()
const port: string = process.env.PORT || '5000'

// cors policy and connect to graphql
app.use(cors())
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  }),
)

// port listening
app.listen(port, (err) => {
  if (err) {
    return console.error(err)
  }
  return console.log(`server is listening on ${port}`)
})
