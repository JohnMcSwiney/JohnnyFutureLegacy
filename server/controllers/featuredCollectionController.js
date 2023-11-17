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

  // Delete a featured collection by connectedCollectionId
  async deleteFeaturedCollectionByConnectedId(req, res) {
    try {
      const { connectedCollectionId } = req.params;

      const deletedCollection = await FeaturedCollection.findOneAndDelete({ connectedCollectionId });

      if (!deletedCollection) {
        return res.status(404).json({ error: 'No such Featured Collection' });
      }

      res.status(204).json(); // No content
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Delete a featured collection by ID
  async deleteFeaturedCollectionById(req, res) {
    try {
      const { id } = req.params;

      const deletedCollection = await FeaturedCollection.findByIdAndDelete(id);

      if (!deletedCollection) {
        return res.status(404).json({ error: 'No such Featured Collection' });
      }

      res.status(204).json(); // No content
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  // Update a featured collection by ID
  async updateFeaturedCollectionById(req, res) {
    try {
      const { id } = req.params;
      const {
        userId,
        connectedCollectionId,
        videoLink,
        startDate,
        endDate,
        importance,
      } = req.body;

      const updatedCollection = await FeaturedCollection.findByIdAndUpdate(
        id,
        {
          userId,
          connectedCollectionId,
          videoLink,
          startDate,
          endDate,
          importance,
        },
        { new: true }
      );

      if (!updatedCollection) {
        return res.status(404).json({ error: 'No such Featured Collection' });
      }

      res.status(200).json(updatedCollection);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = FeaturedCollectionController;
