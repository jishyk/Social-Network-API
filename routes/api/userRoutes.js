const express = require('express');
const router = express.Router();
const {
    getAllUsers,
    getUserById, 
    createUser, 
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/userController');

// GET and POST routes for /api/users
router.get('/', getAllUsers);
router.post('/', createUser);

// GET, PUT, and DELETE routes for /api/users/:userId
router.get('/:userId', getUserById);
router.put('/:userId', updateUser);
router.delete('/:userId', deleteUser);

// POST route to add a friend to a user's friend list
// This route should include both the userId and the friendId as parameters
router.post('/:userId/friends/:friendId', addFriend);

// DELETE route to remove a friend from a user's friend list
router.delete('/:userId/friends/:friendId', removeFriend);

module.exports = router;
