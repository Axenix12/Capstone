const {ApolloServer} = require('apollo-server');
const {typeDefs} = require('../src/schema');
const resolvers = require('../src/resolvers');

const startServer = () => new ApolloServer({typeDefs, resolvers});
const testServer = startServer();

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
    const {getBooks} = response.data;

    expect(getBooks.length).toBe(4);
    })
}
)

describe('Testing addBook', () => {
  const query = `
  query AddBooks{
    addBooks(){

    }
  }
  `
})

// describe('Testing getBook', () => {
//   const testServer = startServer();

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
//     const {book} = response.data;

//     expect(book.id).toBe('1');
//     expect(book.title).toBe('Harry Potter and the Chamber of Secrets');
//     expect(book.coverImage).toBe('https://m.media-amazon.com/images/I/51mFoFmu0EL._AC_SY780_.jpg');
//     expect(book.description).toBe('Harry Potter and the Chamber of Secrets is a 1998 young adult fantasy novel by J.K. Rowling, the second in the Harry Potter series. The story follows Harry’s tumultuous second year at Hogwarts School of Witchcraft and Wizardry, including an encounter with Voldemort, the wizard who killed Harry’s parents. Against this fantastic backdrop, Rowling examines such themes as death, fame, friendship, choice, and prejudice. Upon release, the novel became a worldwide bestseller and won several awards, including Children’s Book of the Year at the British Book Awards and the Nestlé Smarties Book Award; it was subsequently adapted into a 2002 film directed by Chris Columbus.');
//     })
// }
// )
