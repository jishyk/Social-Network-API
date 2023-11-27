const Thought = require('../models/Thought');
const User = require('../models/User');

const thoughtController = {
    // Get all thoughts
    getAllThoughts: async (req, res) => {
        try {
            const thoughts = await Thought.find().select('-__v').sort({ _id: -1 });
            res.json(thoughts);
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    },

    // Get a single thought by id
    getThoughtById: async (req, res) => {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId }).select('-__v');
            if (!thought) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }
            res.json(thought);
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    },

    // Create a new thought
    createThought: async (req, res) => {
        try {
            const thought = await Thought.create(req.body);
            await User.findOneAndUpdate(
                { username: thought.username },
                { $addToSet: { thoughts: thought._id } },
                { runValidators: true, new: true }
            );
            res.status(200).json(`Thought ${thought._id} created!`);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // Update a thought
    updateThought: async (req, res) => {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );
            if (!thought) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }
            res.json(`Thought ${thought._id} updated!`);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // Delete a thought
    deleteThought: async (req, res) => {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
            if (!thought) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }
            await User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId } },
                { new: true }
            );
            res.json(`Thought ${req.params.thoughtId} deleted!`);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // Add a reaction to a thought
    addReaction: async (req, res) => {
        try {
            console.log("Adding reaction to thoughtId:", req.params.thoughtId);
            console.log("Reaction data:", req.body);
    
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { new: true, runValidators: true }
            );
    
            if (!thought) {
                console.log("No thought found with this id");
                return res.status(404).json({ message: 'No thought with that id' });
            }
            res.json(thought);
        } catch (error) {
            console.error("Error in addReaction:", error);
            res.status(500).json(error);
        }
    },
    

    // Remove a reaction from a thought
    removeReaction: async (req, res) => {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { runValidators: true, new: true }
            );
            if (!thought) {
                return res.status(404).json({ message: 'No thought with that id' });
            }
            res.json(`Reaction ${req.params.reactionId} removed from thought ${req.params.thoughtId}!`);
        } catch (error) {
            res.status(500).json(error);
        }
    }
};

module.exports = thoughtController;
