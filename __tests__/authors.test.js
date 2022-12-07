import { ApolloServer } from "@apollo/server";
import { typeDefs } from "../src/schema.js";
import { resolvers } from "../src/resolvers.js";

const startServer = () => new ApolloServer({ typeDefs, resolvers });
const testServer = startServer();

describe("Authors Test", () => {
	describe("Testing getAuthors", () => {
		const query = `
    query GetAuthors {
      getAuthors {
        id
        firstName
        lastName
      }
    }
    `;

		it("Should return all authors", async () => {
			const response = await testServer.executeOperation({ query });
			const { getAuthors } = await response.body.singleResult.data;

			expect(getAuthors.length).toBe(8);
		});
	});
});
