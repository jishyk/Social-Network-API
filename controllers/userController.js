const User = require('../models/User');

exports.getAllUsers = async (req, res) => {
    try {
      const users = await User.find({}).populate('thoughts').populate('friends');
      res.json(users);
    } catch (error) {
      res.status(500).send(error);
    }
  };


const userController = {
  getAllUsers: async (req, res) => {
    
  },
  getUserById: async (req, res) => {
 
  }
};

module.exports = userController;


// will be adding more users to the database
