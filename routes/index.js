const router = require('express').Router();
const userRoutes = require('./api/userRoutes');
const thoughtRoutes = require('./api/thoughtRoutes');
const apiRoutes = require('./api/index'); 

// Add routes
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);
router.use('/api', apiRoutes); 

module.exports = router;
