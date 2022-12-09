import { ApolloServer } from "@apollo/server";
import { typeDefs } from "../src/schema.js";
import { resolvers } from "../src/resolvers.js";

describe("Categories Test", () => {
	let testServer;

	beforeEach(() => {
		const startServer = () => new ApolloServer({ typeDefs, resolvers });
		testServer = startServer();
	});

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

	describe("Testing addCategory", () => {
		const query = `
  mutation Mutation {
  	addCategory(name: "jokes", books: ["1", "2"]) {
    	books {
      		id
    	}
    	id
    	name
  		}
	}
	`;
		it("Should return all books", async () => {
			const response = await testServer.executeOperation({ query });
			const { addCategory } = await response.body.singleResult.data;

			expect(addCategory.id).toBe("4");
			expect(addCategory.name).toBe("jokes");
			expect(addCategory.books.length).toBe(2);
		});
	});
});
