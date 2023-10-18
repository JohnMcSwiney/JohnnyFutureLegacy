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
      { creatorName: { $in: [query] } },
      { assetDescription: { $regex: query, $options: "i" } },
    ],
  };

  const assets = await Asset.find(filter);
  return assets;
};

const searchCollections = async (query) => {
  const filter = {
    $or: [
      { collectionName: { $regex: query, $options: "i" } },
      { collectionDescription: { $regex: query, $options: "i" } },
    ],
  };

  const collections = await Collection.find(filter);
  return collections;
};

// Add search methods for other models as needed

module.exports = searchController;

