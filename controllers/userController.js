const User = require('../models/User');
const Thought = require('../models/Thought');

const userController = {
    // GET all users
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find({})
                .populate({ path: 'thoughts', select: '-__v' })
                .select('-__v')
                .sort({ _id: -1 });
            res.json(users);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // GET a single user by its _id and populated thought and friend data
    getUserById: async (req, res) => {
        try {
            const user = await User.findOne({ _id: req.params.userId })
                .populate({ path: 'thoughts', select: '-__v' })
                .populate('friends')
                .select('-__v');

            if (!user) {
                return res.status(404).json({ message: 'No user with that id' });
            };

            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // POST a new user
    createUser: async (req, res) => {
        try {
            const user = await User.create(req.body);
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // PUT to update a user by its _id
    updateUser: async (req, res) => {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                req.body,
                { runValidators: true, new: true }
            );

            if (!user) {
                return res.status(404).json({ message: 'No user with that id' });
            };

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // DELETE to remove a user by its _id
    deleteUser: async (req, res) => {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });

            if (!user) {
                return res.status(404).json({ message: 'No user with that id' });
            };

            await Thought.deleteMany({ username: user.username });
            res.json({ message: `User ${user._id} deleted!` });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // POST to add a new friend to a user's friend list
    // Add a new friend to a user's friend list
    addFriend: async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { new: true, runValidators: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'No user found with this ID' });
        }

        res.json({ message: `Friend added to user ${req.params.userId}` });
    } catch (err) {
        res.status(500).json(err);
    }
},

    // Remove a friend from a user's friend list
    removeFriend: async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true, runValidators: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'No user found with this ID' });
        }

        res.json({ message: `Friend removed from user ${req.params.userId}` });
    } catch (err) {
        res.status(500).json(err);
    }
},
};


module.exports = userController;
