const express = require('express');
const router = express.Router();
const AssetController = require('../controllers/assetController');

const assetController = new AssetController();

// Get all collections
router.get('/', assetController.getAllAssets);

router.get('/search', assetController.searchAssets);

// Get a single collection by ID
router.get('/:id', assetController.getAssetById);

// Create a new collection
router.post('/', assetController.createAsset);

// Update a collection by ID
router.put('/:id', assetController.updateAssetById);

// Delete a collection by ID
router.delete('/:id', assetController.deleteAssetById);

module.exports = router;