const express = require('express');
const router = express.Router();
const Controller = require('../Controllers/userController');

// Route to register a new user
router.post('/users/add', Controller.addUser);

module.exports = router;
