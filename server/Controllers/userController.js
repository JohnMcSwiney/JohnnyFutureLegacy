const saltRounds = parseInt(process.env.SALT_ROUNDS);
const mongoose = require("mongoose");
const Users = require("../models/userModel");
const Asset = require('../models/assetModel');
const fs = require("fs/promises");
const bcrypt = require("bcrypt");
const path = require('path');

const salt = bcrypt.genSaltSync(saltRounds);
class UserController {
  // Get all Users
  async getUsers(req, res) {
    try {
      const User = await Users.find({}).sort({ createdAt: 1 });
      res.status(200).json(User);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Search for users by username
  async searchUsersByUsername(req, res) {
    try {
      const { username } = req.params;

      const users = await User.find({ username });

      if (!users || users.length === 0) {
        return res
          .status(404)
          .json({ error: "No users found with the given username" });
      }

      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  // Search for users by last name
  async searchUsersByLastName(req, res) {
    try {
      const { lastname } = req.params;

      const users = await User.find({ lastName: lastname });

      if (!users || users.length === 0) {
        return res
          .status(404)
          .json({ error: "No users found with the given last name" });
      }

      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  // Get a single user by ID
  async getUserId(req, res) {
    try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such User" });
      }

      const user = await Users.findById(id).populate("userCollections");

      if (!user) {
        return res.status(404).json({ error: "No such User" });
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  // Get user by username
  async getUserByUsername(req, res) {
    try {
      const { username } = req.params;

      const user = await Users.findOne({ username });

      if (!user) {
        return res.status(404).json({ error: "No such User" });
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  // Create a new user
  async createUser(req, res) {
    try {
      const {
        username,
        password,
        firstName,
        lastName,
        email,
        subTier,
        isInstit,
        bio,
      } = req.body; // Add email, subTier, and isInstit fields to the request body

      // Hash the password before storing it
      const hashedPassword = bcrypt.hashSync(password, salt);
      const user = await Users.create({
        username,
        password: hashedPassword,
        firstName,
        lastName,
        email, // Include email
        subTier, // Include subTier
        isInstit, // Include isInstit
        bio,
      });

      // Create a folder for the user's uploads using MongoDB _id
      const userUploadsFolderPath = `uploaded_files/${user._id.toString()}`;
      await fs.mkdir(userUploadsFolderPath);

      // Create a subfolder named 'Banner' within the user's uploads folder
      const bannerFolderPath = `${userUploadsFolderPath}/Banner`;
      await fs.mkdir(bannerFolderPath);

      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
// Add a method to handle profile picture upload
async uploadProfilePicture(req, res) {
  try {
    const userId = req.params.id;

    // Check if req.file is defined
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const profilePictureUrl = req.file.originalname;

    // Assuming you have a User model instance and "profilePicture" field in your schema
    const user = await Users.findByIdAndUpdate(
      userId,
      { profilePicture: profilePictureUrl },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!user) {
      return res.status(404).json({ error: "No such User" });
    }

    res
      .status(200)
      .json({ message: "Profile picture uploaded successfully", profilePictureUrl: profilePictureUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Get user's profile picture
async getUserProfilePicture(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such User" });
    }

    const user = await Users.findById(id, "profilePicture");

    if (!user) {
      return res.status(404).json({ error: "No such User" });
    }

    res.status(200).json({ profilePictureUrl: user.profilePicture });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


  // Update the isInstit field for a user
  async updateIsInstit(req, res) {
    try {
      const { id } = req.params;
      const { isInstit } = req.body;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such User" });
      }

      // Update the isInstit field for the user with the provided ID
      const updatedUser = await Users.findByIdAndUpdate(
        id,
        { isInstit },
        { new: true, runValidators: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ error: "No such User" });
      }

      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  // Update user's bio
  async updateBio(req, res) {
    try {
      const { id } = req.params;
      const { bio } = req.body;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such User" });
      }

      const user = await Users.findByIdAndUpdate(
        id,
        { bio },
        { new: true, runValidators: true }
      );

      if (!user) {
        return res.status(404).json({ error: "No such User" });
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  // Add a collection to userCollections
  async addUserCollection(req, res) {
    try {
      const { id } = req.params;
      const { collectionId } = req.body;

      if (
        !mongoose.Types.ObjectId.isValid(id) ||
        !mongoose.Types.ObjectId.isValid(collectionId)
      ) {
        return res.status(404).json({ error: "Invalid User or Collection ID" });
      }

      // Find the user by ID and update userCollections
      const updatedUser = await Users.findByIdAndUpdate(
        id,
        { $push: { userCollections: collectionId } },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ error: "No such User" });
      }

      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  // Get user's purchases
  async getUserPurchases(req, res) {
    try {
      const { id } = req.params;

      // Check if the provided ID is valid
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid User ID" });
      }

      // Find the user by ID and retrieve purchases
      const user = await Users.findById(id).populate("purchases");

      if (!user) {
        return res.status(404).json({ error: "No such User" });
      }

      const purchases = user.purchases;
      res.status(200).json(purchases);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  // Add a purchase to user's purchases
  async addPurchase(req, res) {
    try {
      const { id } = req.params;
      const { assetId } = req.body;

      // Check if assetId is provided
      if (!assetId) {
        return res
          .status(400)
          .json({ error: "Asset ID is required in the request body" });
      }

      // Check if the provided IDs are valid
      if (
        !mongoose.Types.ObjectId.isValid(id) ||
        !mongoose.Types.ObjectId.isValid(assetId)
      ) {
        return res.status(404).json({ error: "Invalid User or Asset ID" });
      }

      // Find the user by ID and update purchases
      const updatedUser = await Users.findByIdAndUpdate(
        id,
        { $push: { purchases: assetId } },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ error: "No such User" });
      }

      res.status(200).json(updatedUser);
    } catch (error) {
      console.error("Error adding purchase:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  // Delete a user by ID
  async deleteUser(req, res) {
    try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such User" });
      }

      const user = await Users.findOneAndDelete({ _id: id });

      if (!user) {
        return res.status(400).json({ error: "No such User" });
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  // Add a method to handle file upload
  async uploadBannerImage(req, res) {
    try {
      const userId = req.params.id;

      // Check if req.file is defined
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const filename = req.file.originalname;

      // Assuming you have a User model instance and "userBannerImage" field in your schema
      const user = await Users.findByIdAndUpdate(
        userId,
        { userBannerImage: filename },
        {
          new: true,
          runValidators: true,
        }
      );

      if (!user) {
        return res.status(404).json({ error: "No such User" });
      }

      res
        .status(200)
        .json({ message: "File uploaded successfully", filename: filename });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  // Get user's banner image
  async getUserBannerImage(req, res) {
    try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such User" });
      }

      const user = await Users.findById(id, "userBannerImage");

      if (!user) {
        return res.status(404).json({ error: "No such User" });
      }

      res.status(200).json({ userBannerImage: user.userBannerImage });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
// Delete all assets for a specific user
async deleteAllUserAssets(req, res) {
  try {
    const userId = req.params.id;

    // Validate if the user exists
    const user = await Users.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Find all assets associated with the user
    const assets = await Asset.find({ creatorName: userId });

    // Delete each asset
    for (const asset of assets) {
      // Delete the asset image files if they exist (adjust the path as needed)
      const imagePath = path.join(__dirname, '..', 'uploaded_files', userId, asset.assetImage);

      // Check if the file exists using the callback version of fs.access
      fs.access(imagePath, (error) => {
        if (!error) {
          // File exists, so unlink it
          fs.unlink(imagePath, (unlinkError) => {
            if (unlinkError) {
              console.error(`Error deleting file: ${unlinkError.message}`);
            }
          });
        } else {
          // Handle the case where the file doesn't exist or there's an error accessing it
          console.error(`Error accessing file: ${error.message}`);
        }
      });

      // Delete the asset document from the database
      await Asset.findByIdAndRemove(asset._id);
    }

    res.status(200).json({ message: 'All user assets deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
}

module.exports = UserController;
