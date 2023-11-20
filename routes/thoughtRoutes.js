const express = require('express');
const router = express.Router();
const thoughtController = require('../controllers/thoughtController');

// Define Routes here
router.get('/', thoughtController.getAllThoughts);
router.get('/:id', thoughtController.getThoughtById);
router.post('/', thoughtController.createThought);
router.put('/:id', thoughtController.updateThought);
router.delete('/:id', thoughtController.deleteThought);

module.exports = router;
