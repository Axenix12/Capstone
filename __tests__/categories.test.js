import { ApolloServer } from "@apollo/server";
import { typeDefs } from "../src/schema.js";
import { resolvers } from "../src/resolvers.js";

describe("Categories Test", () => {
	const startServer = () => new ApolloServer({ typeDefs, resolvers });
	const testServer = startServer();

	describe("Testing getCategories", () => {
		const query = `
    query GetCategories {
        getCategories {
          id
          name
          books {
            id
          }
        }
      }
    `;

		it("Should return all authors", async () => {
			const response = await testServer.executeOperation({ query });
			const { getCategories } = response.body.singleResult.data;

			expect(getCategories.length).toBe(3);
			expect(getCategories[0].books.length).toBe(3);
		});
	});
});
