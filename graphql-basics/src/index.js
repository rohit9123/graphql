import { GraphQLServer } from "graphql-yoga";
import db from "./db";
import Query from "./resolvers/Query";
import Mutation from "./resolvers/Mutation";
import User from "./resolvers/User";
import Comment from "./resolvers/Comment";
import Post from "./resolvers/Post";
import Subscription from "./resolvers/subscription";
import { PubSub } from "graphql-subscriptions";

// Scalar types - String, Boolean, Int, Float, ID

// Type definitions (schema)

const pubsub = new PubSub();
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
    Subscription,
  },
  context: {
    db,
    pubsub
  },
});

// Start the server
server.start(() => {
  console.log("The server is up!");
});
