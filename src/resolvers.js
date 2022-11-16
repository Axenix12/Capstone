const {authors} = require('./schema');
const {books} = require('./schema');
const {categories} = require('./schema');

const resolvers = {
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