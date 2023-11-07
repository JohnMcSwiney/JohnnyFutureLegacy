const mongoose = require("mongoose");
const Collection = require("../models/collectionModel");
const { ObjectId } = mongoose.Types;
class CollectionController {
  // Get all collections
  async getCollections(req, res) {
    try {
      const collections = await Collection.find({})
        .sort({ collectionDate: 1 })
        .populate("collectionAssets"); // Populate the 'collectionAssets' field
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

      const collection = await Collection.findById(id).populate(
        "collectionAssets"
      ); // Populate the 'collectionAssets' field;

      if (!collection) {
        return res.status(404).json({ error: "No such Collection" });
      }

      res.status(200).json(collection);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  // Get multiple collections by their IDs
  async getMultiCollectionsByIds(req, res) {
    try {
      const { collectionIds } = req.body; // Expect an array of collection IDs in the request body

      // Validate that all collection IDs are valid
      if (!collectionIds.every((id) => mongoose.Types.ObjectId.isValid(id))) {
        return res.status(404).json({ error: "Invalid Collection ID" });
      }

      // Find collections by their IDs and populate the 'collectionAssets' field
      const collections = await Collection.find({
        _id: { $in: collectionIds },
      }).populate("collectionAssets");

      res.status(200).json(collections);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  // Create a new collection
  async createCollection(req, res) {
    try {
      console.log(req.body); // Create a new collection instance based on the model and request body
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
  // Set the default collection image
  async setDefaultCollectionImage(req, res) {
    try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such Collection" });
      }

      // Find the collection by ID
      const collection = await Collection.findById(id);

      if (!collection) {
        return res.status(404).json({ error: "No such Collection" });
      }

      // Check if the collection has assets
      if (collection.collectionAssets.length === 0) {
        return res.status(400).json({ error: "Collection has no assets" });
      }

      // Set the default image to the first asset image
      collection.collectionImage = collection.collectionAssets[0];

      // Save the updated collection
      await collection.save();

      res.status(200).json(collection);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  // Update the ownerName of a collection
  async updateCollectionOwnerName(req, res) {
    try {
      const { id } = req.params;
      const { newOwnerName } = req.body;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such Collection" });
      }

      // Find the collection by ID
      const collection = await Collection.findById(id);

      if (!collection) {
        return res.status(404).json({ error: "No such Collection" });
      }

      // Update the ownerName
      collection.ownerName = newOwnerName;

      // Save the updated collection
      await collection.save();

      res.status(200).json(collection);
    } catch (error) {
      res.status(500).json({ error: error.message });
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
  // Delete collections by IDs
  async deleteMultipleCollections(req, res) {
    console.log("delete many");
    try {
      const { ids } = req.body; // Expecting an array of IDs in the request body

      if (!Array.isArray(ids) || ids.length === 0) {
        return res
          .status(400)
          .json({ error: "Invalid or empty list of IDs provided" });
      }

      // Convert the provided IDs to valid ObjectId instances
      const validIds = ids.map((id) => new ObjectId(id));

      const { deletedCount } = await Collection.deleteMany({
        _id: { $in: validIds },
      });

      if (deletedCount === 0) {
        return res.status(404).json({ error: "No matching Collections found" });
      }

      res.status(204).json(); // No content
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = CollectionController;
