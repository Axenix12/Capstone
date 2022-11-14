const {ApolloServer} = require('apollo-server');
const typeDefs = require('./schema');
const authors = require('./schema');
const books = require('./schema');
const categories = require('./schema');

const server = new ApolloServer({typeDefs});

server.listen().then(() => {
    console.log(`
      🚀  Server is running!
      🔉  Listening on port 4000
      📭  Query at http://localhost:4000
    `);
  });