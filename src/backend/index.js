import express from "express";
import { ApolloServer } from "apollo-server-express";
import schema from "./schema.js";

const startApolloServer = async () => {
  const app = express();

  // Create an instance of ApolloServer
  const server = new ApolloServer({ schema });

  // Start the Apollo Server
  await server.start();

  // Apply Apollo GraphQL middleware to the Express app
  server.applyMiddleware({ app });

  // Start listening on a port
  app.listen(4000, () => {
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
  });
};

startApolloServer();
