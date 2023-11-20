const Thought = require('../models/Thought');
const User = require('../models/User');

const thoughtController = {
    // Get all thoughts
    getAllThoughts: async (req, res) => {
        try {
            const thoughts = await Thought.find({});
            res.json(thoughts);
        } catch (error) {
            res.status(500).send(error);
        }
    },

    // Get a single thought by id
    getThoughtById: async (req, res) => {
        try {
            const thought = await Thought.findById(req.params.id);
            if (!thought) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }
            res.json(thought);
        } catch (error) {
            res.status(500).send(error);
        }
    },

    // Create a new thought
    createThought: async (req, res) => {
        try {
            const newThought = new Thought(req.body);
            const thought = await newThought.save();

            // Add the thought to the user's thoughts array
            await User.findByIdAndUpdate(req.body.userId, {
                $push: { thoughts: thought._id }
            });

            res.status(201).json(thought);
        } catch (error) {
            res.status(500).send(error);
        }
    },

    // Update a thought
    updateThought: async (req, res) => {
        try {
            const thought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!thought) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }
            res.json(thought);
        } catch (error) {
            res.status(500).send(error);
        }
    },

    // Delete a thought
    deleteThought: async (req, res) => {
        try {
            const thought = await Thought.findByIdAndDelete(req.params.id);
            if (!thought) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }

            // Remove the thought from the user's thoughts array
            await User.findByIdAndUpdate(thought.userId, {
                $pull: { thoughts: thought._id }
            });

            res.json({ message: 'Thought successfully deleted!' });
        } catch (error) {
            res.status(500).send(error);
        }
    },

    // Additional methods for reactions can be added here
};

module.exports = thoughtController;
