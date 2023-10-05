const express = require('express');
const router = express.Router();
const Controller = require('../Controllers/userController');

// Route to register a new user
router.post('/users/add', Controller.addUser);
router.get('/users', Controller.getAllUsers);
router.patch('/users/:_id', Controller.updateUser);
router.delete('/users/:_id', Controller.deleteUser);

module.exports = router;
