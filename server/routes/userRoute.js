const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

const userController = new UserController();

// Get all users
router.get('/', userController.getUsers);

// Search for users by username
router.get('/username/:username', userController.searchUsersByUsername);

// Search for users by last name
router.get('/lastname/:lastname', userController.searchUsersByLastName);

// Get a single user by ID
router.get('/:id', userController.getUserId);

// Get user by username
router.get('/users/username/:username', userController.getUserByUsername);

// Create a new user
router.post('/', userController.createUser);

// Route for updating a user's profile picture URL
router.post('/:id/profile-picture', userController.updateProfilePicture);

// Update user's bio
router.put('/:id/bio', userController.updateBio);

// Route for updating the isInstit field
router.put('/:id/isInstit', userController.updateIsInstit);

// Route for adding a collection to userCollections
router.post('/:id/user-collections', userController.addUserCollection);

// Get user's purchase
router.get('/:id/purchase', userController.getUserPurchases);

// Add purchase to user
router.post('/:id/purchase', userController.addPurchase);

// Delete a user by ID
router.delete('/:id', userController.deleteUser);

module.exports = router;
