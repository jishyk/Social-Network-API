const express = require('express');
const router = express.Router();
const thoughtController = require('../../controllers/thoughtController');

router.get('/' , (req, res) => {
    res.send('Hello World!')
}
)


module.exports = router;
