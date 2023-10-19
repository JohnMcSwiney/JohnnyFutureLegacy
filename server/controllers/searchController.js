const mongoose = require("mongoose");

// Import your models
const Asset = require('../models/assetModel');
const Collection = require('../models/collectionModel');
const User = require('../models/userModel');
// Import any other models you want to make searchable

const searchController = {
  search: async (query, modelName) => {
    
    try {
      let results;
      switch (modelName) {
        case 'All':
           // Search for everything and consolidate the results
           const assetResults = await searchAssets(query);
            const collectionResults = await searchCollections(query);
            console.log(assetResults);
            // const userResults = await searchUsers(query);

        // Create an object to consolidate the results
            results = {
            assets: assetResults,
            collections: collectionResults,
            // users: userResults, 
            };
            break;

        case 'Asset':
            
          results = await searchAssets(query);
          break;
        case 'Collection':
          results = await searchCollections(query);
          break;
        // Add cases for other models as needed
        default:
          throw new Error('Model not found');
      }
      return results;
    } catch (error) {
      throw error;
    }
  },
};

const searchAssets = async (query) => {
    const filter = {
        $or: [
          { assetName: { $regex: query, $options: "i" } },
          { informationTags: { $in: [query] } },
        //   { creatorName: { $in: [query] } },
          { assetDescription: { $regex: query, $options: "i" } },
        ],
      };
    
    //   console.log('Asset Search Filter:', filter);
    
      try {
        const assets = await Asset.find(filter);
        // console.log('Asset Search Results:', assets);
        // Handle or return the results as needed
        return assets;
      } catch (error) {
        console.error('Error during asset search:', error);
        // Handle the error, or return an error response
      }
      
};

const searchCollections = async (query) => {
  const filter = {
    $or: [
      { collectionName: { $regex: query, $options: "i" } },
      { collectionDescription: { $regex: query, $options: "i" } },
    ],
  };
  try {
    const collections = await Collection.find(filter);
    // console.log('Asset Search Results:', assets);
    // Handle or return the results as needed
    return collections;
  } catch (error) {
    console.error('Error during collection search:', error);
    // Handle the error, or return an error response
  }
  
  
};

// Add search methods for other models as needed

module.exports = searchController;

