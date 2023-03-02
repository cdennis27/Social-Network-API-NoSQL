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
    },
    // Get a single thought
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v')
            .then(async (thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json(thought)
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // Create a thought
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                User.findOneAndUpdate(
                    { _id: req.params.userId },
                    { $push: { thoughts: thought._id } },
                    { new: true }
                )
                    .then((user) => {
                        if (!user) {
                            return res.status(404).json({ message: 'No user with that ID' });
                        }
                        return res.json(thought);
                    })
                    .catch((err) => res.status(500).json(err));
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // Update a thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            req.body,
            { new: true, runValidators: true }
        )
            .then((thought) => {
                if (!thought) {
                    return res.status(404).json({ message: 'No thought with that ID' });
                }
                return res.json(thought);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // Delete a thought
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) => {
                if (!thought) {
                    return res.status(404).json({ message: 'No thought with that ID' });
                }
                User.findOneAndUpdate(
                    { _id: thought.userId },
                    { $pull: { thoughts: thought._id } },
                    { new: true }
                )
                    .then((user) => {
                        if (!user) {
                            return res.status(404).json({ message: 'No user with that ID' });
                        }
                        return res.json({ message: 'Thought deleted!' });
                    })
                    .catch((err) => res.status(500).json(err));
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },

    // Add a reaction to a thought
    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $push: { reactions: req.body } },
            { new: true, runValidators: true }
        )
            .then((thought) => {
                if (!thought) {
                    return res.status(404).json({ message: 'No thought with that ID' });
                }
                return res.json(thought);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            }
            );
    },
    // Delete a reaction from a thought
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true }
        )
            .then((thought) => {
                if (!thought) {
                    return res.status(404).json({ message: 'No thought with that ID' });
                }
                return res.json(thought);
            }
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            }
            );
    }








};








