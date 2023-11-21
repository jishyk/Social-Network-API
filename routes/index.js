const express = require('express');
const router = express.Router();
const { userController, thoughtController } = require('../controllers');

router.get('/users', userController.getAllUsers);
router.get('/users/:userId', userController.getUserById);
router.get('/thoughts', thoughtController.getAllThoughts);
router.get('/thoughts/:thoughtId', thoughtController.getThoughtById);

// ... other route definitions ...

module.exports = router;
