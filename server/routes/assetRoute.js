const express = require('express');
const router = express.Router();
const AssetController = require('../controllers/assetController');

const assetController = new AssetController();

// Get all Assets
router.get('/', assetController.getAllAssets);

router.get('/search', assetController.searchAssets);

// Get a single Asset by ID
router.get('/:id', assetController.getAssetById);

// Create a new Asset
router.post('/', assetController.createAsset);

// Update a Asset by ID
router.put('/:id', assetController.updateAssetById);

// Delete a Asset by ID
router.delete('/:id', assetController.deleteAssetById);

// Update the collectionId by ID
router.put('/:id/update-collection', assetController.updateCollectionIdForAsset);

module.exports = router;