const users = [
  {
    username: "John Doe",
    email: "JohnDoe@Doe.com",
    thoughts: [],
    friends: []
  },
  {
    username: "Jake Woe",
    email: "JakeWoe@Woe.com",
    thoughts: [],
    friends: []
  },
  // Add more users as needed
];

const thoughts = [
  {
    thoughtText: "Here's a cool thought...",
    username: "John Doe",
    reactions: []
  },
  {
    thoughtText: "Another interesting thought...",
    username: "Jake Woe",
    reactions: []
  },
  // Add more thoughts as needed
];

module.exports = { users, thoughts };
