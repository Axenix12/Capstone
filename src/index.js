import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import http from "http";
import cors from "cors";
import json from "body-parser";
import { typeDefs } from "./schema.js";
import { resolvers } from "./resolvers.js";

async function startServer() {
	const app = express();
	const httpServer = http.createServer(app);

	const server = new ApolloServer({
		typeDefs,
		resolvers,
		plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
	});
	await server.start();
	app.use(
		"/graphql",
		cors(),
		json(),
		expressMiddleware(server, {
			context: async ({ req }) => ({ token: req.headers.token }),
		})
	);
	const port = process.env.PORT || 4000;
	await new Promise((resolve) => httpServer.listen({ port }, resolve));
	console.log(`
      🚀  Server is running!
      🔉  Listening on port ${port}
      📭  Query at http://localhost:${port}/graphql
    `);
}
startServer();
