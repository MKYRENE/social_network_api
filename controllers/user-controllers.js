const User = require('../models/user');

const userController = {
    // TODO: Implement user controller methods
//==========================================================================================================================\\
    //GETTING ALL USERS \\
    getAllUsers: async (req, res) => {

        try {
            console.log('It works!')
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //==========================================================================================================================\\
    //GETTING USER BY ID \\
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
//==========================================================================================================================\\
    // CREATING NEW USER \\
    createUser: async (req, res) => {
        try {
            console.log('Created new user')
            const { username, email } = req.body;
            const newUser = await User.create({ username, email });
            res.json(newUser);
        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    },
//==========================================================================================================================\\
    // UPDATE USER BY ID \\
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
//==========================================================================================================================\\
    // DELETE USER BY ID \\
    deleteUserById: async (req, res) => {
        try {
            const { id } = req.params;
            const deletedUser = await User.findByIdAndDelete(id);
            if (!deletedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            // Bonus: REMOVE THE USER ASSOCIATES \\
            if (deletedUser.thoughts.length) {
                await Thought.deleteMany({ username: deletedUser.username });
            }

            res.json(deletedUser);
        } catch (err) {
            res.status(500).json(err);
        }
    },
//==========================================================================================================================\\
    // ADD A FRIEND TO USER FRIEND LIST \\
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
//==========================================================================================================================\\
    // REMOVE A FRIEND FROM USER'S FRIEND LIST \\
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

//==========================================================================================================================\\
// EXPORTING \\

module.exports = userController;
