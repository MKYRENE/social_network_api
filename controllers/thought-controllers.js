const  Thought  = require('../models/thought');


const thoughtController = {
  // TODO: Implement thought controller methods
  
    getAllThoughts: async (req, res) => {

        try {
            const Thoughts = await Thought.find();
            res.json(Thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    getThoughtById: async (req, res) => {
        try {
            const { id } = rew.params;
            const Thought = await Thought.findById(id).populate('thoguht friends');
            if (!Thought) {
                return res.status(404).json({ message: 'Thought not found' });
            }
            res.json(Thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Create a new Thought
    createThought: async (req, res) => {
        try {
            console.log('Make a new Thought')
            const { Thoughtname, email } = req.body;
            const newThought = await Thought.create({ Thoughtname, email });
            res.json(newThought);
        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    },

    // Update a Thought by ID
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

    // Delete a Thought by ID
    deleteThoughtById: async (req, res) => {
        try {
            const { id } = req.params;
            const deletedThought = await Thought.findByIdAndDelete(id);
            if (!deletedThought) {
                return res.status(404).json({ message: 'Thought not found' });
            }
            // Bonus: Remove the Thought's associated thoughts
            await Thought.deleteMany({ Thoughtname: deletedThought.Thoughtname });

            res.json(deletedThought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Add a friend to a Thought's friend list
    addFriend: async (req, res) => {
        try {
            const { ThoughtId, friendId } = req.params;
            const Thought = await Thought.findByIdAndUpdate(ThoughtId, { $addToSet: { friends: friendId } }, { new: true });
            if (!Thought) {
                return res.status(404).json({ message: 'Thought not found' });
            }
            res.json(Thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Remove a friend from a Thought's friend list
    removeFriend: async (req, res) => {
        try {
            const { ThoughtId, friendId } = req.params;
            const Thought = await Thought.findByIdAndUpdate(ThoughtId, { $pull: { friends: friendId } }, { new: true });
            if (!Thought) {
                return res.status(404).json({ message: 'Thought not found' });
            }
            res.json(Thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};

module.exports = thoughtController;
