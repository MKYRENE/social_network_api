// TODO: Import reactionController and implement routes
const router = require('express').Router();
// Adding destructuring
const { addReactionToThought, removeReactionFromThought } = require('../controllers/reaction-controllers');

// Reaction routes
router.route('/:thoughtId/reactions')
    .post(addReactionToThought);

router.route('/:thoughtId/reactions/:reactionId')
    .delete(removeReactionFromThought);

module.exports = router;
