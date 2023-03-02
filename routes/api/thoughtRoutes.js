const router = require('express').Router();

const {
    getAllThoughts
} = require('../../controllers/thoughtController.js');

router.route('/').get(getAllThoughts);










module.exports = router;
