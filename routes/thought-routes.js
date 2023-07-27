const router = require('express').Router();
const { getAllThoughts, createThought } = require('../controllers/thought-controllers')
// TODO: Import thoughtController and implement routes
router.route('/thought')
    .get(getAllThoughts)
    .post(createThought);

router.route('/thoughts/:id')
    // .get(getThoughtById)
    // .put(updateThoughtById)
    // .delete(deleteThoughtById);

router.route('/thoughts/:thoughtId/reactions')
    // .post(createReaction);

router.route('/thoughts/:thoughtId/reactions/:reactionId')
    // .delete(removeReaction);


module.exports = router;
