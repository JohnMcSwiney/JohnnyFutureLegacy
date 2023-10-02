const mongoose = require("mongoose");
const Users = require("../models/userModel");

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

      const user = await Users.findById(id);

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
      } = req.body; // Add email, subTier, and isInstit fields to the request body

      // Add to db
      const user = await Users.create({
        username,
        password,
        firstName,
        lastName,
        email, // Include email
        subTier, // Include subTier
        isInstit, // Include isInstit
      });
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  // Update user's profile picture URL
  async updateProfilePicture(req, res) {
    try {
      const { id } = req.params;
      const { profilePictureUrl } = req.body;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such User' });
      }

      // Assuming you have a User model instance and "profilePicture" field in your schema
      const user = await Users.findByIdAndUpdate(id, { profilePicture: profilePictureUrl }, {
        new: true,
        runValidators: true,
      });

      if (!user) {
        return res.status(404).json({ error: 'No such User' });
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
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
}

module.exports = UserController;
