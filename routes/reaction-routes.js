// TODO: Import reactionController and implement routes
const router = require('express').Router();
const { createReaction, removeReaction } = require('../controllers/reaction-controllers');


// Reaction routes
router.route('/thoughts/:thoughtId/reactions')
    // .post(createReaction);

router.route('/thoughts/:thoughtId/reactions/:reactionId')
    // .delete(removeReaction);

module.exports = router;



