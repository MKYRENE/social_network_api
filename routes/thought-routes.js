const router = require('express').Router();
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThoughtById,
  deleteThoughtById,
} = require('../controllers/thought-controllers');

// Thought routes
router.route('/thoughts')
    .get(getAllThoughts)
    .post(createThought);

router.route('/thoughts/:id')
    .get(getThoughtById)
    .put(updateThoughtById)
    .delete(deleteThoughtById);

router.route('/thoughts/:thoughtId/reactions')
    // .post(createReaction);

router.route('/thoughts/:thoughtId/reactions/:reactionId')
    // .delete(removeReaction);

module.exports = router;
