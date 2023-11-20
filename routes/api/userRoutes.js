const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');

router.get('/' , (req, res) => {
    res.send('Hello World!')
}
)



module.exports = router;
