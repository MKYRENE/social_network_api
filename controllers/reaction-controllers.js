const Thought = require('../models/thought');
const Reaction = require('../models/reaction');

const reactionController = {
  //==========================================================================================================================\\
  // ADD A REACTION TO A THOUGHT \\
  addReactionToThought: async (req, res) => {
    console.log("triggered")

    try {
      const { thoughtId } = req.params;
      const { reactionBody, username } = req.body;
      //==========================================================================================================================\\
      // CREATE A NEW OBJECT \\
      const newReaction = new Reaction({ username, reactionBody });
      await newReaction.save();

      console.log(thoughtId, reactionBody)

      // FIND THE THOUGHT AND ASSOCIATE THE REACTION \\
      const thought = await Thought.findById(thoughtId);

      console.log(thought)

      if (!thought) {
        // await newReaction.remove();
        return res.status(404).json({ message: 'Thought not found' });
      }

      thought.reactions.push(newReaction._id);
      await thought.save();

      res.json(thought);
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  },
  //==========================================================================================================================\\
  // REMOVE A REACTION FOR A THOUGHT \\
  removeReactionFromThought: async (req, res) => {
    try {
      const { thoughtId, reactionId } = req.params;

      // FIND THE THOUGHT AND CHECK IF THE REACTION EXIST \\
      const thought = await Thought.findById(thoughtId);
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }

      // FIND THE INDEX OF THE REACTION \\
      const reactionIndex = thought.reactions.indexOf(reactionId);

      // IF THE REACTION IS FOUND REMOVE IT FROM THE ARRAY \\
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


//==========================================================================================================================\\

// EXPORTING \\

module.exports = reactionController;
