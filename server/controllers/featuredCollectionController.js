const FeaturedCollection = require('../models/featuredCollectionModel');

class FeaturedCollectionController {
  // Create a new featured collection
  async createFeaturedCollection(req, res) {
    try {
      const {
        userId,
        connectedCollectionId,
        videoLink,
        startDate,
        endDate,
        importance, // Include the importance level
      } = req.body;

      const featuredCollection = new FeaturedCollection({
        userId,
        connectedCollectionId,
        videoLink,
        startDate,
        endDate,
        importance,
      });

      await featuredCollection.save();

      res.status(201).json(featuredCollection);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Get all featured collections
  async getFeaturedCollections(req, res) {
    try {
      const featuredCollections = await FeaturedCollection.find().sort({ importance: 1 });
      res.status(200).json(featuredCollections);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Other controller methods for updating, deleting, and managing featured collections can be added as needed.
}

module.exports = FeaturedCollectionController;
