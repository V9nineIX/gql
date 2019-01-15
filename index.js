import express from "express";
import expressGraphQL from "express-graphql";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
var { buildSchema } = require('graphql');
var router = express.Router();

import { request } from 'graphql-request'

const app = express();
const PORT = process.env.PORT || 4000;
const db = "mongodb+srv://playwork:12345@cluster0-4z3vr.mongodb.net/link"

mongoose.connect(db, {
    useCreateIndex: true,
    useNewUrlParser: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));


// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

const userSchema = require('./graphql/index').userSchema;

// config  graph QL
app.use(
    "/graphql",
    cors(),
    bodyParser.json(),
    expressGraphQL({
        schema : userSchema,
        rootValue: global,
        graphiql:true
    })
)


//example  query 

// const query = `{
//     users {
//       id,
//       name
//     }
//   }`

// request('http://localhost:4000/graphql', query).then(data =>
//   console.log("result data" ,  data)
// )

// listen 
app.listen(PORT , ()=> console.log('Server running  on port' ))