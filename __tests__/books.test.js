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
    const {getBooks} = await response.data;

    expect(getBooks.length).toBe(4);
    })
}
)

describe('Testing addBook', () => {
  const query = `
  mutation AddBook {
    addBook(
      title: "vibes"
      author: "1"
      categories: ["1"]
      coverImage: "cool picture"
      description: "fun book"
    ) {
      id
      title
      coverImage
      description
    }
  }
  `
  it('Should return all books', async () => {
    const response = await testServer.executeOperation({ query });
    const {addBook} = await response.data;

    expect(addBook.id).toBe("5");
    expect(addBook.title).toBe("vibes");
    expect(addBook.coverImage).toBe("cool picture");
    expect(addBook.description).toBe("fun book");
    })
})

describe('Testing getBook', () => {
  const testServer = startServer();

    const query = `
    query GetBook($getBookId: ID!) {
      getBook(id: $getBookId) {
        id
        title
        description
        coverImage
      }
    }
    `

    it('Should return one book based on id', async () => {
    const response = await testServer.executeOperation({ query, variables: {getBookId: '1'} });
    const {getBook} = await response.data;

    expect(getBook.id).toBe('1');
    expect(getBook.title).toBe('Harry Potter and the Chamber of Secrets');
    expect(getBook.coverImage).toBe('https://m.media-amazon.com/images/I/51mFoFmu0EL._AC_SY780_.jpg');
    expect(getBook.description).toBe('Harry Potter and the Chamber of Secrets is a 1998 young adult fantasy novel by J.K. Rowling, the second in the Harry Potter series. The story follows Harry’s tumultuous second year at Hogwarts School of Witchcraft and Wizardry, including an encounter with Voldemort, the wizard who killed Harry’s parents. Against this fantastic backdrop, Rowling examines such themes as death, fame, friendship, choice, and prejudice. Upon release, the novel became a worldwide bestseller and won several awards, including Children’s Book of the Year at the British Book Awards and the Nestlé Smarties Book Award; it was subsequently adapted into a 2002 film directed by Chris Columbus.');
    })
}
)
