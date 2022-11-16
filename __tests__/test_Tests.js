const {ApolloServer} = require('apollo-server');
const {typeDefs} = require('../src/schema');
const resolvers = require('../src/resolvers');

const startServer = () => new ApolloServer({typeDefs, resolvers});


const testServer = startServer();


testServer.listen().then(() => {
    console.log(`
      🚀  Server is running!
      🔉  Listening on port 4000
      📭  Query at http://localhost:4000
    `);
  });

describe('Testing getBooks', () => {

    const query = `
    query GetBooks {
        getBooks{
          id
          title
          coverImage
          description
        }
      }
    `

    it('Should return all books', async () => {
    const response = await testServer.executeOperation({ query });
    const {books} = response.data;

    expect(books.length).toBe(4);
    })
}
)

// describe('Testing getBook', () => {

//     const query = `
//     query GetBook($bookId: ID!) {
//         getBook(id: $bookId){
//           id
//           title
//           coverImage
//           description
//         }
//       }
//     }
//     `

//     it('Should return one book based on id', async () => {
//     const response = await testServer.executeOperation({ query, variables: {bookId: '1'} });
//     //const {list} = response.data;

//     expect(response.data).toBe();
//     })
// }
// )

// test('Testing getAuthors', () => {expect().toBe()})

// test('Testing getCategories', () => {expect().toBe()})

// test('Testing addBook', () => {expect().toBe()})

// test('test test', () => {expect(true).toBe(true)})