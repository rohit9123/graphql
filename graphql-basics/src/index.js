import { GraphQLServer } from "graphql-yoga";
import db from "./db";
import Query from "./resolvers/Query";
import Mutation from "./resolvers/Mutation";
import User from "./resolvers/User";
import Comment from "./resolvers/Comment";
import Post from "./resolvers/Post";

// Scalar types - String, Boolean, Int, Float, ID

// Type definitions (schema)

// Server setup
const port = 4000;

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers: {
    Query,
    Mutation,
    User,
    Comment,
    Post,
  },
  context: {
    db,
  },
});

// Start the server
server.start(() => {
  console.log("The server is up!");
});
