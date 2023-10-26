const express = require('express');
const router = express.Router();
const FeaturedCollectionController = require('../controllers/featuredCollectionController');

const featuredCollectionController = new FeaturedCollectionController();

// Create a new featured collection
router.post('/', featuredCollectionController.createFeaturedCollection);

// Get all featured collections
router.get('/', featuredCollectionController.getFeaturedCollections);

// Add additional routes for updating, deleting, and managing featured collections as needed

module.exports = router;
