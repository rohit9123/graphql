const users = [
  {
    id: "123",
    name: "Andrew",
    email: "adknadkn",
    age: 27,
    posts: ["1232"],
    comments: ["1"],
  },
  {
    id: "122",
    name: "Andrew",
    email: "andsn;sac",
    age: 27,
    posts: ["1222"],
    comments: ["2"],
  },
  {
    id: "125",
    name: "mike",
    email: "adkadiahhicshicsanadkn",
    age: 27,
    posts: ["1252"],
    comments: ["3", "4"],
  },
];

const posts = [
  {
    id: "1232",
    title: "My first post",
    body: "This is my first post",
    published: true,
    author: "123",
    comments: ["1", "2"],
  },
  {
    id: "1222",
    title: "My second post",
    body: "This is my second post",
    published: false,
    author: "122",
    comments: ["3"],
  },
  {
    id: "1252",
    title: "My third post",
    body: "This is my third post",
    published: true,
    author: "125",
    comments: ["4"],
  },
];

const comments = [
  {
    id: "1",
    text: "This worked well for me. Thanks!",
    author: "123",
    post: "1232",
  },
  {
    id: "2",
    text: "Glad you enjoyed it.",
    author: "122",
    post: "1232",
  },
  {
    id: "3",
    text: "This did not work.",
    author: "125",
    post: "1222",
  },
  {
    id: "4",
    text: "Nevermind. I got it to work.",
    author: "125",
    post: "1252",
  },
];

const db = { users, posts, comments };
export { db as default };
