const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { users, thoughts } = require('./data');

connection.on('error', (err) => err);
connection.once('open', async () => {
    console.log('connected, seeding...');

    // Drop existing users
    await User.deleteMany({});
    // Drop existing thoughts
    await Thought.deleteMany({});

    await Thought.collection.insertMany(thoughts);

    await User.collection.insertMany(users);






    console.table(users);
    console.table(thoughts);
    console.info('Seeding complete! 🌱');
    process.exit(0);
});