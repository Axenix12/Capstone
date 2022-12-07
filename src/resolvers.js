import { authors, books, categories } from "./schema.js";

export const resolvers = {
	book: {
		author: ({ author: authorId }) =>
			authors.find((author) => author.id === authorId),
		categories: ({ categories: categoryIds }) =>
			categories.filter((category) => categoryIds.includes(category.id)),
	},
	author: {
		books: ({ book: bookIds }) =>
			books.filter((book) => bookIds.includes(book.id)),
	},
	category: {
		books: ({ books: bookIds }) =>
			books.filter((book) => bookIds.includes(book.id)),
	},
	Query: {
		getBooks: () => books,
		getAuthors: () => authors,
		getCategories: () => categories,
		getBook: (_parent, { id }) => books.find((book) => book.id === id),
	},
	Mutation: {
		addBook(_parent, { title, author, coverImage, categories, description }) {
			const book = {
				id: String(books.length + 1),
				title,
				author,
				coverImage,
				categories,
				description,
			};
			books.push(book);
			return book;
		},
	},
};
