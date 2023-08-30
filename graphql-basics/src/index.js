import { GraphQLServer } from "graphql-yoga";

// Scalar types - String, Boolean, Int, Float, ID

// Type definitions (schema)
const users = [
  {
    id: "123",
    name: "Andrew",
    email: "adknadkn",
    age: 27,
    posts: ["1232" ],
    comments: ['1']
  },
  {
    id: "122",
    name: "Andrew",
    email: "andsn;sac",
    age: 27,
    posts: ["1222"],
    comments: ['2']
  },
  {
    id: "125",
    name: "mike",
    email: "adkadiahhicshicsanadkn",
    age: 27,
    posts: ["1252"],
    comments: ['3', '4']
  },
];

const posts = [
  {
    id: "1232",
    title: "My first post",
    body: "This is my first post",
    published: true,
    author: "123",
    comments: ['1', '2']
  },
  {
    id: "1222",
    title: "My second post",
    body: "This is my second post",
    published: false,
    author: "122",
    comments: ['3']
  },
  {
    id: "1252",
    title: "My third post",
    body: "This is my third post",
    published: true,
    author: "125",
    comments: ['4']
  },
];

const comments = [
    {
        id: '1',
        text: 'This worked well for me. Thanks!',
        author: '123',
        post: '1232'
    },
    {
        id: '2',
        text: 'Glad you enjoyed it.',
        author: '122',
        post: '1232'
    },
    {
        id: '3',
        text: 'This did not work.',
        author: '125',
        post: '1222'
    },
    {
        id: '4',
        text: 'Nevermind. I got it to work.',
        author: '125',
        post: '1252'
    },
]

const typeDefs = `
    type Query {
        users(query:String): [User!]!
        me: User!
        post(query:String): [Post!]!
        comments: [Comment!]!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
        comments: [Comment!]!
    }
    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
        comments: [Comment!]!
    }
    type Comment {
        id: ID!
        text: String!
        author: User!
        post: Post!
    }
`;

// Resolvers
const resolvers = {
  Query: {
    users(parent, args, ctx, info) {
      if (!args.query) {
        return users;
      }
      return users.filter((user) => {
        return user.name.toLowerCase().includes(args.query.toLowerCase());
      });
    },
    me() {
      return {
        id: "123098",
        name: "Mike",
        email: "mike@example.com",
        age: 28,
      };
    },
    comments(parent, args, ctx, info) {

        return comments;
    },
    post(parent, args, ctx, info) {
      if (!args.query) {
        return posts;
      }
      return posts.filter((post) => {
        return (
          post.title.toLowerCase().includes(args.query.toLowerCase()) ||
          post.body.toLowerCase().includes(args.query.toLowerCase())
        );
      });
    },
  },
  Post: {
    author(parent, args, ctx, info) {
      return users.find((user) => {
        return user.id === parent.author;
      });
    },
    comments(parent, args, ctx, info) {
        return comments.filter((comment) => {
          return comment.post === parent.id;
        });
    }
  },
  User: {
    posts(parent, args, ctx, info) {
      return posts.filter((post) => {
        return post.author === parent.id;
      });
    },
    comments(parent, args, ctx, info) {
        return comments.filter((comment) => {
          return comment.author === parent.id;
        });
    }
  },
  Comment :{
    author(parent, args, ctx, info) {
        return users.find((user) => {
          return user.id === parent.author;
        })
    },
    post(parent, args, ctx, info) {
        return posts.find((post) => {
          return post.id === parent.post;
        })
    }
  }
};

// Server setup
const port = 4001;

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

// Start the server
server.start(() => {
  console.log("The server is up!");
});
