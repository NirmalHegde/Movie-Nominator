const express = require("express");
require("dotenv").config();
import { graphqlHTTP } from "express-graphql";
import schema from "./schema/schema"

const app = express();
const port: string = process.env.PORT || "5000";

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
