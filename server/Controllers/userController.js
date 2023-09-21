const User = require('../models/userModel');
const mongoose = require('mongoose');

class UserController {
  // Get all User
  async getUser(req, res) {
    try {
      const User = await User.find({}).sort({ createdAt: 1 });
      res.status(200).json(User);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get a single user by ID
  async getUserId(req, res) {
    try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such User' });
      }

      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json({ error: 'No such User' });
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

      const user = await User.findOne({ username });

      if (!user) {
        return res.status(404).json({ error: 'No such User' });
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Create a new user
  async createUser(req, res) {
    try {
      const { username, password, firstName, lastName } = req.body;

      // Add to db
      const user = await User.create({
        username,
        password,
        firstName,
        lastName,
      });
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
        return res.status(404).json({ error: 'No such User' });
      }

      const user = await User.findOneAndDelete({ _id: id });

      if (!user) {
        return res.status(400).json({ error: 'No such User' });
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = UserController;