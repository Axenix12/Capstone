const {ApolloServer} = require('apollo-server');
const {typeDefs} = require('../src/schema');
const resolvers = require('../src/resolvers');

export const startServer = () => new ApolloServer({typeDefs, resolvers});