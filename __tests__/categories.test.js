const {ApolloServer} = require('apollo-server');
const {typeDefs} = require('../src/schema');
const resolvers = require('../src/resolvers');

const startServer = () => new ApolloServer({typeDefs, resolvers});
const testServer = startServer();

describe('Testing getCategories', () => {
    const query = `
    query GetCategories {
        getCategories {
          id
          name
        }
      }
    `

    it('Should return all authors', async () => {
    const response = await testServer.executeOperation({ query });
    const {getCategories} = await response.data;

    expect(getCategories.length).toBe(3);
    })
}
)