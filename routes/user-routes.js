
const { removeFriend, getAllUsers, getUserById, createUser, deleteUserById, updateUserById, addFriend, } = require('../controllers/user-controllers');
const router = require('express').Router();

// TODO: Import userController and implement routes
router.route('/')
    .get(getAllUsers)
    .post(createUser);

// UPDATING USER NEED ID AND PUT METHOD
router.route('/:id')
    .get(getUserById)
    .put(updateUserById)
    .delete(deleteUserById);

router.route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend);


module.exports = router;
