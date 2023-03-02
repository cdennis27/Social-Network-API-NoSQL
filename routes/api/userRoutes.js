const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    createUser,
    addFriend,
    deleteFriend,
} = require('../../controllers/userController.js');

router.route('/').get(getAllUsers).post(createUser);

router.route('/:userId').get(getUserById).put(updateUser).delete(deleteUser);

router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);




module.exports = router;