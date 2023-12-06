const express = require('express');
const multer = require('multer'); 
const path = require('path');
const fs = require('fs');
const UserController = require('../controllers/userController');

const router = express.Router();
const userController = new UserController();

// Set up Multer storage for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const userId = req.params.id;
      const userFolderPath = path.join(__dirname, `../uploaded_files/${userId}/Banner`);
      fs.mkdirSync(userFolderPath, { recursive: true });
      cb(null, userFolderPath);
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
  
  const upload = multer({ storage: storage });

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

// Get Banner Image
router.get('/:id/banner', userController.getUserBannerImage);

// Update Banner Image
router.post('/:id/uploadBanner', upload.single('file'), userController.uploadBannerImage);

// Create a route to delete all assets for a specific user
router.delete('/:id/assets', userController.deleteAllUserAssets);


module.exports = router;
