import { ApolloServer } from '@apollo/server';
import { typeDefs } from '../src/schema.js';
import { resolvers } from '../src/resolvers.js';

describe('Categories Test', () => {
  let testServer;

  beforeEach(() => {
    const startServer = () => new ApolloServer({ typeDefs, resolvers });
    testServer = startServer();
  });

  describe('Testing getCategories', () => {
    const query = `
    query GetCategories {
        getCategories {
          id
          name
          books {
            id
          }
        }
      }
    `;

    it('Should return all categories', async () => {
      const response = await testServer.executeOperation({ query });
      const { getCategories } = response.body.singleResult.data;

      expect(getCategories.length).toBe(3);
      expect(getCategories[0].books.length).toBe(3);
    });
  });

  describe('Testing addCategory', () => {
    const query = `
mutation Mutation($addCategoryName: String!, $addCategoryBooks: [ID]) {
  addCategory(name: $addCategoryName, books: $addCategoryBooks) {
    books {
      id
    }
    id
    name
  }
}
	`;
    it('Should add a category', async () => {
      const response = await testServer.executeOperation({
        query,
        variables: {
          addCategoryName: 'jokes',
          addCategoryBooks: ['1', '2']
        }
      });
      const { addCategory } = await response.body.singleResult.data;

      expect(addCategory.id).toBe('4');
      expect(addCategory.name).toBe('jokes');
      expect(addCategory.books.length).toBe(2);
    });
  });

  describe('Testing getCategory', () => {
    const query = `
    query GetBook($getCategoryId: ID!) {
      getCategory(id: $getCategoryId) {
        id
        name
        books {
          id
        }
      }
    }
    `;

    it('Should return one category based on id', async () => {
      const response = await testServer.executeOperation({
        query,
        variables: { getCategoryId: '1' }
      });
      const { getCategory } = await response.body.singleResult.data;

      expect(getCategory.id).toBe('1');
      expect(getCategory.name).toBe('Fantasy');
      expect(getCategory.books.length).toBe(3);
    });
  });
});
