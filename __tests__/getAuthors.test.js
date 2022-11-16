const {ApolloServer} = require('apollo-server');
const {typeDefs} = require('../src/schema');
const resolvers = require('../src/resolvers');
const {books} = require('../src/schema');

const testServer = new ApolloServer({typeDefs, resolvers});

describe('Testing getAuthors', () => {
    const query = `
    query GetAuthors {
        getAuthors{
          id
          firstName
          lastName
        }
      }
    }
    `

    it('Should return all authors', async () => {

    })
})