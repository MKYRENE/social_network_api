const User = require('../models/user');

const userController = {
    // TODO: Implement user controller methods
    getAllUsers: async (req, res) => {

        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    getUserById: async (req, res) => {
        try {
            const { id } = req.params;
            const user = await User.findById(id).populate('thought friends');
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Create a new user
    createUser: async (req, res) => {
        try {
            console.log('Make a new user')
            const { username, email } = req.body;
            const newUser = await User.create({ username, email });
            res.json(newUser);
        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    },

    // Update a user by ID
    updateUserById: async (req, res) => {
        try {
            const { id } = req.params;
            const { username, email } = req.body;
            const updatedUser = await User.findByIdAndUpdate(id, { username, email }, { new: true });
            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(updatedUser);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Delete a user by ID
    deleteUserById: async (req, res) => {
        try {
            const { id } = req.params;
            const deletedUser = await User.findByIdAndDelete(id);
            if (!deletedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            // Bonus: Remove the user's associated thoughts
            await Thought.deleteMany({ username: deletedUser.username });

            res.json(deletedUser);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Add a friend to a user's friend list
    addFriend: async (req, res) => {
        try {
            const { userId, friendId } = req.params;
            const user = await User.findByIdAndUpdate(userId, { $addToSet: { friends: friendId } }, { new: true });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Remove a friend from a user's friend list
    removeFriend: async (req, res) => {
        try {
            const { userId, friendId } = req.params;
            const user = await User.findByIdAndUpdate(userId, { $pull: { friends: friendId } }, { new: true });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};


module.exports = userController;
