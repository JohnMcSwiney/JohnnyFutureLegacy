const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController'); // Adjust the path as needed

// Define the route for searching based on model
router.get('/:modelName?', async (req, res) => {
    // console.log('Route triggered')
    const modelName = req.params.modelName;
    const query = req.query.q;
    // console.log("model name: " + modelName)
    // console.log("query: " + query)
    try {
        if (modelName) {
          // If a modelName is specified, search that specific model
          if (modelName === 'Asset' || modelName === 'Collection') {
            const results = await searchController.search(query, modelName);
            res.status(200).json(results);
          } else if (modelName === 'All') {
            // Search for everything
            
            const assetResults = await searchController.search(query, 'Asset');
            // console.log("assets in var")
            const collectionResults = await searchController.search(query, 'Collection');
            // console.log("collections in var")
            // const userResults = await searchController.search(query, 'User'); // Add other models as needed
    
            // Combine or format the results as needed and return
            res.status(200).json({
              assetResults,
              collectionResults,
            //   userResults, // Add other model results here
            });
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
