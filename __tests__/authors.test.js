import { ApolloServer } from '@apollo/server';
import { typeDefs } from '../src/schema.js';
import { resolvers } from '../src/resolvers.js';

describe('Authors Test', () => {
  let testServer;

  beforeEach(() => {
    const startServer = () => new ApolloServer({ typeDefs, resolvers });
    testServer = startServer();
  });

  describe('Testing getAuthors', () => {
    const query = `
    query GetAuthors {
      getAuthors {
        id
        firstName
        lastName
        books {
          id
        }
      }
    }
    `;

    it('Should return all authors', async () => {
      const response = await testServer.executeOperation({ query });
      const { getAuthors } = await response.body.singleResult.data;

      expect(getAuthors.length).toBe(8);
      expect(getAuthors[0].books.length).toBe(3);
    });
  });

  describe('Testing getAuthor', () => {
    const query = `
    query Query($getAuthorId: ID!) {
  		getAuthor(id: $getAuthorId) {
    		id
    		firstName
    		lastName
  		}
	}
    `;

    it('Should return one book based on id', async () => {
      const response = await testServer.executeOperation({
        query,
        variables: { getAuthorId: '1' }
      });
      const { getAuthor } = await response.body.singleResult.data;

      expect(getAuthor.id).toBe('1');
      expect(getAuthor.firstName).toBe('J.K.');
      expect(getAuthor.lastName).toBe('Rowling');
    });
  });
});
