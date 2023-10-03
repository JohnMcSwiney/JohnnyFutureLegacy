const express = require('express');
const router = express.Router();
const CollectionController = require('../controllers/collectionController');

const collectionController = new CollectionController();

// Get all collections
router.get('/', collectionController.getCollections);

// Search for collections by name, ownerName, and description
router.get('/search', collectionController.searchCollections);

// Get a single collection by ID
router.get('/:id', collectionController.getCollectionById);

// Create a new collection
router.post('/', collectionController.createCollection);

// Update a collection by ID
router.put('/:id', collectionController.updateCollection);

// Route to set the default collection image
router.put('/:id/set-default-image', collectionController.setDefaultCollectionImage);

// Delete a collection by ID
router.delete('/:id', collectionController.deleteCollection);

module.exports = router;