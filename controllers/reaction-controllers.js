const Thought = require('../models/thought');
const Reaction = require('../models/reaction');

const reactionController = {
  // Add a reaction to a Thought
  addReactionToThought: async (req, res) => {
    try {
      const { thoughtId } = req.params;
      const { reactionText } = req.body;

      // Create a new reaction object
      const newReaction = new Reaction({ reactionText });
      await newReaction.save();

      // Find the thought and associate the reaction with it
      const thought = await Thought.findById(thoughtId);
      if (!thought) {
        await newReaction.remove();
        return res.status(404).json({ message: 'Thought not found' });
      }

      thought.reactions.push(newReaction._id);
      await thought.save();

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Remove a reaction from a Thought
  removeReactionFromThought: async (req, res) => {
    try {
      const { thoughtId, reactionId } = req.params;

      // Find the thought and check if the reaction exists
      const thought = await Thought.findById(thoughtId);
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }

      // Find the index of the reaction in the thought's reactions array
      const reactionIndex = thought.reactions.indexOf(reactionId);

      // If the reaction is found, remove it from the array
      if (reactionIndex !== -1) {
        thought.reactions.splice(reactionIndex, 1);
        await thought.save();
        await Reaction.findByIdAndDelete(reactionId); // Also delete the reaction document from the Reaction model
      } else {
        return res.status(404).json({ message: 'Reaction not found in the thought' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = reactionController;
