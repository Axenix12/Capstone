const {authors} = require('./schema');
const {books} = require('./schema');
const {categories} = require('./schema');

const resolvers = {
    books: {
        author: ({author: authorId}) => authors.find(authors => authors.id === authorId),
        categories: ({categories: categoryIds}) => categories.filter(categories => categoryIds.includes(categories.id))
    },
    authors: {
        books: ({books: bookIds}) => books.filter(books => bookIds.includes(books.id))
    },
    categories: {
        books: ({books: bookIds}) => books.filter(books => bookIds.includes(books.id))
    },
    Query: {
        getBooks: () => books,
        getAuthors: () => authors,
        getCategories: () => categories,
        getBook: (_parent, {id}) => books.find(books => books.id === id),
    },
    Mutation: {
        addBook: (_parent, {title, author, coverImage, categories, description}) => {
            const book = {
                id: String(books.length + 1),
                title,
                author: author, 
                coverImage: coverImage,
                categories: categories,
                description: description,
            };
            books.push(book)
            return book;
        }
    }
}

module.exports = resolvers;