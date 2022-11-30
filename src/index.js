import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import {typeDefs} from './schema.js';
import {resolvers} from './resolvers.js';

async function startServer(){
  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer({typeDefs, resolvers, plugins: [ApolloServerPluginDrainHttpServer({httpServer})]});
  await server.start();
  const port = process.env.PORT || 4000;
  await new Promise(resolve => httpServer.listen({ port }, resolve));
  console.log(`
      🚀  Server is running!
      🔉  Listening on port ${port}
      📭  Query at http://localhost:${port}
    `);
}
  startServer();