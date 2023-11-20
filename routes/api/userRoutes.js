const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');

router.get('/' , (req, res) => {
    res.send('Hello World!')
}
)

router.get('/users', userController.getAllUsers);
// router.get('/users/:id', userController.getUserById);



module.exports = router;
