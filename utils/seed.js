const mongoose = require('mongoose');
const { users, thoughts } = require('./data');
const User = require('../models/User');
const Thought = require('../models/Thought');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/socialNetworkDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedDatabase = async () => {
  try {

    await User.deleteMany({});
    await Thought.deleteMany({});


    await User.insertMany(users);
    await Thought.insertMany(thoughts);

    console.log('Database seeded!');
    process.exit(0);
  } catch (err) {
    console.error('Failed to seed database:', err);
    process.exit(1);
  }
};

seedDatabase();
