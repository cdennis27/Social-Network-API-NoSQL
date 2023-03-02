const router = require('express').Router();

const {
    getAllUsers
} = require('../../controllers/userController.js');

router.route('/').get(getAllUsers);








module.exports = router;