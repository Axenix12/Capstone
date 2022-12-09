import { ApolloServer } from "@apollo/server";
import { typeDefs } from "../src/schema.js";
import { resolvers } from "../src/resolvers.js";

describe("Authors Test", () => {
	const startServer = () => new ApolloServer({ typeDefs, resolvers });
	const testServer = startServer();

	describe("Testing getAuthors", () => {
		const query = `
    query GetAuthors {
      getAuthors {
        id
        firstName
        lastName
        books {
          id
        }
      }
    }
    `;

		it("Should return all authors", async () => {
			const response = await testServer.executeOperation({ query });
			const { getAuthors } = await response.body.singleResult.data;

			expect(getAuthors.length).toBe(8);
			expect(getAuthors[0].books.length).toBe(3);
		});
	});
});
