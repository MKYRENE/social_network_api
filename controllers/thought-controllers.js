const Thought = require('../models/thought');
const User = require('../models/user');

const thoughtController = {
    // TODO: IMPLEMENT THOUGHT CONTROLLER METHOD \\
//==========================================================================================================================\\
    getAllThoughts: async (req, res) => {

        try {
            const Thoughts = await Thought.find();
            res.json(Thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
//==========================================================================================================================\\
    getThoughtById: async (req, res) => {
        try {
            const { id } = req.params;
            const thought = await Thought.findById(id).populate('reactions');
            if (!thought) {
                return res.status(404).json({ message: 'Thought not found' });
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
//==========================================================================================================================\\
    // CREATE NEW THOUGHT \\
    createThought: async (req, res) => {
        try {
            console.log('Make a new Thought')
            const { thoughtText, username } = req.body;
            const newThought = await Thought.create({ thoughtText, username });
            res.json(newThought);
        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    },
//==========================================================================================================================\\
    // UPDATE A THOUGHT BY ID \\
    updateThoughtById: async (req, res) => {
        try {
            const { id } = req.params;
            const { Thoughtname, email } = req.body;
            const updatedThought = await Thought.findByIdAndUpdate(id, { Thoughtname, email }, { new: true });
            if (!updatedThought) {
                return res.status(404).json({ message: 'Thought not found' });
            }
            res.json(updatedThought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
//==========================================================================================================================\\
    // DELETE A THOUGHT BY ID \\
    deleteThoughtById: async (req, res) => {
        try {
            const { id } = req.params;
            const deletedThought = await Thought.findByIdAndDelete(id);
            if (!deletedThought) {
                return res.status(404).json({ message: 'Thought not found' });
            }
            // Bonus: REMOVE THE THOUGHTS ASSOCIATE THOUGHTS \\
            await Thought.deleteMany({ Thoughtname: deletedThought.Thoughtname });

            res.json(deletedThought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
//==========================================================================================================================\\
    // ADD A THOUGH TO A FRIENDS THOUGHT LIST  \\
    addFriend: async (req, res) => {
        try {
            const { ThoughtId, friendId } = req.params;
            const thought = await Thought.findByIdAndUpdate(ThoughtId, { $addToSet: { friends: friendId } }, { new: true });
            if (!thought) {
                return res.status(404).json({ message: 'Thought not found' });
            }
            thought.friends.push(friendId);
            await thought.save();
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //==========================================================================================================================\\
    // DO NOT INCLUDE IN REACTION CONTROLLER \\
    // REMOVE A FRIEND FROM A THOUGHT FRIEND LIST \\
    removeFriend: async (req, res) => {
        try {
            const { ThoughtId, friendId } = req.params;
            const thought = await Thought.findByIdAndUpdate(ThoughtId, { $pull: { friends: friendId } }, { new: true });
            if (!thought) {
                return res.status(404).json({ message: 'Thought not found' });
            }
            thought.friends.pull(friendId);
            await thought.save();
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};
//==========================================================================================================================\\
// EXPORTING \\
module.exports = thoughtController;

