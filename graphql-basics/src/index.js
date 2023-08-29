import { GraphQLServer } from "graphql-yoga";


// Scalar types - String, Boolean, Int, Float, ID

// Type definitions (schema)

const typeDefs = `
    type Query {
        id: ID!
        name: String!
        age: Int!
        employed: Boolean!
        gpa: Float
        title: String!
        price: Float!
        releaseYear: Int
        rating: Float
        inStock: Boolean!
        me: User!
        post: Post!
        greeting(name: String, position: String): String! 
        add(numbers:[Float!]!): Float!
        grades: [Int!]!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
    }
    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!

    }
`

// Resolvers
const resolvers = {
  Query: {
    greeting(parent, args, ctx, info) {
        //parent - it's the result of the previous resolver execution level (if we have nested resolvers)
        //args - arguments
        //ctx - context - information about the request that is coming in (authentication, user information, etc)
        //info - information about the request
        if(args.name && args.position) {
            return `Hello, ${args.name}! You are my favorite ${args.position}.`
        } else {
            return "Hello!"
        }
    },
    add(parent, args, ctx, info) {
        if(args.numbers.length === 0) {
            return 0;
        }

        // [1, 5, 10, 2]
        return args.numbers.reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
        })
    },
    id() {
        return "abc123";
    },
    name() {
        return "Andrew";
    },
    age() {
        return 27;
    },
    employed() {
        return true;
    },
    gpa() {
        return null;
    },
    title() {
        return "The War of Art";
    },
    price() {
        return 12.99;
    },
    releaseYear() {
        return null;
    },
    rating() {
        return 5;
    },
    inStock() {
        return true;
    },
    me() {
        return {
            id: "123098",
            name: "Mike",
            email: "mike@example.com",
            age: 28
        }
    },
    post() {
        return {
            id: "092",
            title: "GraphQL 101",
            body: "kknnk",
            published: false
        }
    },
    grades(parent, args, ctx, info) {
        return [99, 80, 93];
    }
    
  }
};

// Server setup
const port = 4001;



const server = new GraphQLServer({
    typeDefs,
    resolvers
})

// Start the server
server.start(() => {
    console.log("The server is up!")
})