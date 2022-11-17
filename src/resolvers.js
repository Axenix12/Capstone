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
        getCategories: () => categories
    },
    Mutation: {
        addBook: (_parent, {title, authorId, coverImage, categoryIds, description}) => {
            const book = {
                id: String(books.length + 1),
                title: title,
                author: authorId, 
                coverImage: coverImage,
                categories: categoryIds,
                description: description,
            };
            books.push(book)
            return book;
        }
    }
}

module.exports = resolvers;