const {ApolloServer} = require('apollo-server');
const {typeDefs} = require('../src/schema');
const resolvers = require('../src/resolvers');

const startServer = () => new ApolloServer({typeDefs, resolvers});
const testServer = startServer();

describe('Testing getAuthors', () => {
    const query = `
    query GetAuthors {
      getAuthors {
        id
        firstName
        lastName
      }
    }
    `

    it('Should return all authors', async () => {
    const response = await testServer.executeOperation({ query });
    const {getAuthors} = await response.data;

    expect(getAuthors.length).toBe(8);
    })
}
)