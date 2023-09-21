const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

const userController = new UserController();

// Get all users
router.get('/', userController.getUsers);

// Get a single user by ID
router.get('/:id', userController.getUserId);

// Get user by username
router.get('/users/username/:username', userController.getUserByUsername);

// Create a new user
router.post('/', userController.createUser);

// Delete a user by ID
router.delete('/:id', userController.deleteUser);

module.exports = router;
