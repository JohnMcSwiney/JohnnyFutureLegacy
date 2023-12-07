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

//get multiple collections by IDs
router.post('/getMultiCollectionsByIds',collectionController.getMultiCollectionsByIds);

//Get collection name using ID
router.get('/:id/getName', collectionController.getCollectionName);

// Create a new collection
router.post('/', collectionController.createCollection);

// Update a collection by ID
router.put('/:id', collectionController.updateCollection);

// Route to set the default collection image
router.put('/:id/set-default-image', collectionController.setDefaultCollectionImage);

// Route to update the colleciton owner
router.put('/:id/updateOwner', collectionController.updateCollectionOwnerName)

// Delete a collection by ID
router.delete('/:id', collectionController.deleteCollection);

// deleteMultipleCollections
router.delete('/', collectionController.deleteMultipleCollections);

// Add a featured collection to a specific collection by ID
router.post('/:id/add-featured', collectionController.addFeaturedCollection);

// Remove the featured collection from a specific collection by ID
router.post('/:id/remove-featured', collectionController.removeFeaturedCollection);


module.exports = router;