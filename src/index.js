import http from 'http';
import process from 'process';
import { ApolloServer } from '@apollo/server';
// eslint-disable-next-line n/file-extension-in-import
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
// eslint-disable-next-line n/file-extension-in-import
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import cors from 'cors';
import json from 'body-parser';
import { typeDefs } from './schema.js';
import { resolvers } from './resolvers.js';

async function startServer() {
  const app = express();
  const httpServer = http.createServer(app);
  const apolloServerPluginDrainHttpServer =
    new ApolloServerPluginDrainHttpServer({
      httpServer
    });

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [apolloServerPluginDrainHttpServer]
  });
  await server.start();
  app.use(
    '/graphql',
    cors(),
    json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.token })
    })
  );
  const port = process.env.PORT || 4000;
  await new Promise(resolve => {
    httpServer.listen({ port }, resolve);
  });
  console.log(`
      🚀  Server is running!
      🔉  Listening on port ${port}
      📭  Query at http://localhost:${port}/graphql
    `);
}

await startServer();
