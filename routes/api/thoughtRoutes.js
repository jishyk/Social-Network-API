const express = require('express');
const router = express.Router();
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getAllThoughts).post(createThought);

// POST route to create a reaction
router.post('/:thoughtId/reactions', addReaction);

// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getThoughtById).put(updateThought).delete(deleteThought);

// DELETE route to remove a reaction
router.delete('/:thoughtId/reactions/:reactionId', removeReaction);

module.exports = router;
