const { ObjectId } = require('mongoose').Types;
const { Thought, User } = require('../models');

// Aggregate function to get all thoughts
const thoughtCount = async () =>
    Thought.aggregate()
        .count('thoughtCount')
        .then((numberOfThoughts) => numberOfThoughts);

module.exports = {
    // Get all thoughts
    getAllThoughts(req, res) {
        Thought.find()
            .then(async (thoughts) => {
                const thoughtObj = {
                    thoughts,
                    thoughtCount: await thoughtCount(),
                };
                return res.json(thoughtObj);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    }
};








