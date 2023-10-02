const mongoose = require("mongoose");
const Collection = require("../models/collectionModel");

class CollectionController {
  // Get all collections
  async getCollections(req, res) {
    try {
      const collections = await Collection.find({})
      .sort({ collectionDate: 1 })
      .populate('collectionAssets'); // Populate the 'collectionAssets' field
      res.status(200).json(collections);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Search for collections by name, ownerName, and description
  async searchCollections(req, res) {
    try {
      const { query } = req.query;

      // Define a search filter
      const filter = {
        $or: [
          { collectionName: { $regex: query, $options: "i" } }, // Search by name (case-insensitive)
          { ownerName: { $regex: query, $options: "i" } }, // Search by ownerName (case-insensitive)
          { collectionDescription: { $regex: query, $options: "i" } }, // Search by description (case-insensitive)
        ],
      };

      const collections = await Collection.find(filter);

      res.status(200).json(collections);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get a single collection by ID
  async getCollectionById(req, res) {
    try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such Collection" });
      }

      const collection = await Collection.findById(id)
      .populate('collectionAssets'); // Populate the 'collectionAssets' field;

      if (!collection) {
        return res.status(404).json({ error: "No such Collection" });
      }

      res.status(200).json(collection);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Create a new collection
  async createCollection(req, res) {
    try {
      // Create a new collection instance based on the model and request body
      const collection = new Collection(req.body);

      // Save the collection to the database
      await collection.save();

      res.status(201).json(collection);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Update a collection by ID
  async updateCollection(req, res) {
    try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such Collection" });
      }

      const collection = await Collection.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });

      if (!collection) {
        return res.status(404).json({ error: "No such Collection" });
      }

      res.status(200).json(collection);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Delete a collection by ID
  async deleteCollection(req, res) {
    try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such Collection" });
      }

      const collection = await Collection.findByIdAndRemove(id);

      if (!collection) {
        return res.status(404).json({ error: "No such Collection" });
      }

      res.status(204).json(); // No content
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

}

module.exports = CollectionController;