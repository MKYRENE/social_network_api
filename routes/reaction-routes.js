// TODO: Import reactionController and implement routes
const router = require('express').Router();
const { addReactionToThought, removeReactionFromThought } = require('../controllers/reaction-controller');

// Reaction routes
router.route('/thoughts/:thoughtId/reactions')
    .post(addReactionToThought);

router.route('/thoughts/:thoughtId/reactions/:reactionId')
    .delete(removeReactionFromThought);

module.exports = router;
