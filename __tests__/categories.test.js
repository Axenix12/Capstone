import {ApolloServer} from '@apollo/server';
import {typeDefs} from '../src/schema';
import {resolvers} from '../src/resolvers.js';

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
    `;

	it('Should return all authors', async () => {
		const response = await testServer.executeOperation({query});
		const {getCategories} = response.body.singleResult.data;

		expect(getCategories.length).toBe(3);
	});
},
);
