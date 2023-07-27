const { getAllUsers, getUserById, createUser } = require('../controllers/user-controllers');
const router = require('express').Router();

// TODO: Import userController and implement routes
router.route('/users')
    .get(getAllUsers)
    .post(createUser);

router.route('/users/:id')
    .get(getUserById)
// .put(updateUserById)
// .delete(deleteUserById);

router.route('/users/:userId/friends/:friendId')
// .post(addFriend)
// .delete(removeFriend);


module.exports = router;
