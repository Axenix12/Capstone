import { ApolloServer } from "@apollo/server";
import { typeDefs } from "../src/schema.js";
import { resolvers } from "../src/resolvers.js";
import { authors, books, categories } from "../src/schema.js";

describe("Books Tests", () => {
	let testServer;

	beforeEach(() => {
		const startServer = () => new ApolloServer({ typeDefs, resolvers });
		testServer = startServer();
	});

	describe("Testing getBooks", () => {
		const query = `
    query GetBooks {
        getBooks{
          id
          title
          coverImage
          description
        }
      }
    `;

		it("Should return all books", async () => {
			const response = await testServer.executeOperation({ query });
			const { getBooks } = await response.body.singleResult.data;

			expect(getBooks.length).toBe(4);
		});
	});

	describe("Testing addBook", () => {
		const query = `
mutation AddBook(
  $addBookTitle: String!
  $addBookAuthor: ID!
  $addBookCategories: [ID]!
  $addBookCoverImage: String
  $addBookDescription: String
) {
  addBook(
    title: $addBookTitle
    author: $addBookAuthor
    categories: $addBookCategories
    coverImage: $addBookCoverImage
    description: $addBookDescription
  ) {
    id
    title
    coverImage
    description
  }
}

  `;
		it("Should add a book", async () => {
			const response = await testServer.executeOperation({
				query,
				variables: {
					addBookTitle: "vibes",
					addBookAuthor: "1",
					addBookCategories: ["1"],
					addBookCoverImage: "cool picture",
					addBookDescription: "fun book",
				},
			});
			const { addBook } = await response.body.singleResult.data;

			expect(addBook.id).toBe("5");
			expect(addBook.title).toBe("vibes");
			expect(addBook.coverImage).toBe("cool picture");
			expect(addBook.description).toBe("fun book");
		});
	});

	describe("Testing getBook", () => {
		const query = `
    query GetBook($getBookId: ID!) {
      getBook(id: $getBookId) {
        id
        title
        description
        coverImage
        author {
          id
        }
        categories {
          id
        }
      }
    }
    `;

		it("Should return one book based on id", async () => {
			const response = await testServer.executeOperation({
				query,
				variables: { getBookId: "1" },
			});
			const { getBook } = await response.body.singleResult.data;

			expect(getBook.id).toBe("1");
			expect(getBook.title).toBe("Harry Potter and the Chamber of Secrets");
			expect(getBook.coverImage).toBe(
				"https://m.media-amazon.com/images/I/51mFoFmu0EL._AC_SY780_.jpg"
			);
			expect(getBook.description).toBe(
				"Harry Potter and the Chamber of Secrets is a 1998 young adult fantasy novel by J.K. Rowling, the second in the Harry Potter series. The story follows Harry’s tumultuous second year at Hogwarts School of Witchcraft and Wizardry, including an encounter with Voldemort, the wizard who killed Harry’s parents. Against this fantastic backdrop, Rowling examines such themes as death, fame, friendship, choice, and prejudice. Upon release, the novel became a worldwide bestseller and won several awards, including Children’s Book of the Year at the British Book Awards and the Nestlé Smarties Book Award; it was subsequently adapted into a 2002 film directed by Chris Columbus."
			);
			expect(getBook.author.id).toBe("1");
			expect(getBook.categories.length).toBe(2);
		});
	});

	describe("Testing updateBook", () => {
		const query = `
		mutation Mutation(
  $updateBookId: ID!
  $updateBookTitle: String!
  $updateBookAuthor: ID!
  $updateBookCategories: [ID]!
  $updateBookCoverImage: String
  $updateBookDescription: String
) {
  updateBook(
    id: $updateBookId
    title: $updateBookTitle
    author: $updateBookAuthor
    categories: $updateBookCategories
    coverImage: $updateBookCoverImage
    description: $updateBookDescription
  ) {
    author {
      id
    }
    categories {
      id
    }
    id
    title
    description
    coverImage
  }
}`;

		it("Should update the values of a book based on ID", async () => {
			const response = await testServer.executeOperation({
				query,
				variables: {
					updateBookId: "1",
					updateBookTitle: "Updated tilt",
					updateBookAuthor: "2",
					updateBookCategories: ["2"],
					updateBookCoverImage: "image",
					updateBookDescription: "book",
				},
			});
			const { updateBook } = response.body.singleResult.data;

			expect(updateBook.id).toBe("1");
			expect(updateBook.title).toBe("Updated tilt");
			expect(updateBook.author.id).toBe("2");
			expect(updateBook.categories[0].id).toBe("2");
			expect(updateBook.coverImage).toBe("image");
			expect(updateBook.description).toBe("book");
		});
	});
});
