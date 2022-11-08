const express = require('express');
const router = express.Router();
const { renderUser } = require('../controllers/users');

router.route('/').get(renderUser);

module.exports = router;