const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController'); // Adjust the path as needed

// Define the route for searching based on model
router.get('/search/:modelName?', async (req, res) => {
    const modelName = req.params.modelName;
    const query = req.query.q;

    try {
        if (modelName) {
            // If a modelName is specified, search that specific model
            if (modelName === 'Asset' || modelName === 'Collection') {
                const results = await searchController.search(query, modelName);
                res.status(200).json(results);
            } else {
                res.status(400).json({ error: 'Invalid model name.' });
            }
        } else {
            // If no modelName is specified, search both models
            const assetResults = await searchController.search(query, 'Asset');
            const collectionResults = await searchController.search(query, 'Collection');
            // Combine or format the results as needed and return
            res.status(200).json({ assetResults, collectionResults });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
