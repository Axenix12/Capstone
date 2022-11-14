const {authors} = require('./schema');
const {books} = require('./schema');
const {categories} = require('./schema');

const resolvers = {
    Query: {
        getBooks: () => books,
        getAuthors: () => authors,
        getCategories: () => categories
    }
}

module.exports = resolvers;