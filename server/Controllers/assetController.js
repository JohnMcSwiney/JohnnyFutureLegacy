const mongoose = require("mongoose");
const Asset = require("../models/assetModel");

class AssetController {
  // Get all assets
  async getAllAssets(req, res) {
    try {
      const assets = await Asset.find({});
      res.status(200).json(assets);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Search for assets by name, tag, creatorName, and description
  async searchAssets(req, res) {
    try {
      const { query } = req.query;

      // Define a search filter
      const filter = {
        $or: [
          { assetName: { $regex: query, $options: "i" } }, // Search by name (case-insensitive)
          { informationTags: { $in: [query] } }, // Search by tag
          { creatorName: { $in: [query] } }, // Search by creatorName
          { assetDescription: { $regex: query, $options: "i" } }, // Search by description (case-insensitive)
        ],
      };

      const assets = await Asset.find(filter);

      res.status(200).json(assets);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get a single asset by ID
  async getAssetById(req, res) {
    try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Asset not found" });
      }

      const asset = await Asset.findById(id);

      if (!asset) {
        return res.status(404).json({ error: "Asset not found" });
      }

      res.status(200).json(asset);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Create a new asset
  async createAsset(req, res) {
    try {
      const {
        assetName,
        creatorName,
        uploadDate,
        assetDescription,
        assetPriceUSD,
        informationTags,
        assetImage,
      } = req.body;

      const newAsset = await Asset.create({
        assetName,
        creatorName,
        uploadDate,
        assetDescription: assetDescription || "Description here",
        assetPriceUSD,
        informationTags,
        assetImage,
      });

      res.status(201).json(newAsset);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // Update an asset by ID
  async updateAssetById(req, res) {
    try {
      const { id } = req.params;
      const {
        assetName,
        createrName,
        uploadDate,
        assetDescription,
        assetPriceUSD,
        informationTags,
        assetImage,
      } = req.body;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Asset not found" });
      }

      const updatedAsset = await Asset.findByIdAndUpdate(
        id,
        {
          assetName,
          createrName,
          uploadDate,
          assetDescription: assetDescription || "Description here",
          assetPriceUSD,
          informationTags,
          assetImage,
        },
        { new: true }
      );

      if (!updatedAsset) {
        return res.status(404).json({ error: "Asset not found" });
      }

      res.status(200).json(updatedAsset);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Delete an asset by ID
  async deleteAssetById(req, res) {
    try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Asset not found" });
      }

      const deletedAsset = await Asset.findByIdAndRemove(id);

      if (!deletedAsset) {
        return res.status(404).json({ error: "Asset not found" });
      }

      res.status(200).json({ message: "Asset deleted" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  // Create Exif data for an asset by ID
  async createExifData(req, res) {
    try {
      const { id } = req.params;
      const { exifData } = req.body;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Asset not found" });
      }

      const asset = await Asset.findById(id);

      if (!asset) {
        return res.status(404).json({ error: "Asset not found" });
      }

      asset.exifData = exifData;
      await asset.save();

      res.status(200).json(asset);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get Exif data for an asset by ID
  async getExifDataById(req, res) {
    try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Asset not found" });
      }

      const asset = await Asset.findById(id);

      if (!asset) {
        return res.status(404).json({ error: "Asset not found" });
      }

      const exifData = asset.exifData || []; // Ensure a default empty array if no exifData exists

      res.status(200).json(exifData);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }


  //update connected collection id
  async updateCollectionIdForAsset(req, res) {
    try {
      const { id } = req.params;
  
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such Asset' });
      }
  
      const { collectionId } = req.body;
  
      const asset = await Asset.findByIdAndUpdate(
        id,
        { $set: { collectionId } },
        { new: true, runValidators: true }
      );
  
      if (!asset) {
        return res.status(404).json({ error: 'No such Asset' });
      }
  
      res.status(200).json(asset);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

}

module.exports = AssetController;
