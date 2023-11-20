const express = require('express');
const router = express.Router();
const thoughtController = require('../../controllers/thoughtController');

router.get('/' , (req, res) => {
    res.send('Hello World!')
}
)
router.get('/thoughts', thoughtController.getAllThoughts);
router.get('/thoughts/:id', thoughtController.getThoughtById);  
router.post('/thoughts', thoughtController.createThought);

module.exports = router;
