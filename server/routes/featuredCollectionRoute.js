const express = require('express');
const router = express.Router();
const FeaturedCollectionController = require('../controllers/featuredCollectionController');

const featuredCollectionController = new FeaturedCollectionController();

// Create a new featured collection
router.post('/', featuredCollectionController.createFeaturedCollection);

// Get all featured collections
router.get('/', featuredCollectionController.getFeaturedCollections);

// Get featured collection by ID
router.get('/:id', featuredCollectionController.getFeaturedCollectionById)

router.delete('/delete/:id', featuredCollectionController.deleteFeaturedCollectionByConnectedId);

// Delete a featured collection by ID
router.delete('/delete/:id', featuredCollectionController.deleteFeaturedCollectionById);

// Update a featured collection by ID
router.put('/update/:id', featuredCollectionController.updateFeaturedCollectionById);


module.exports = router;
