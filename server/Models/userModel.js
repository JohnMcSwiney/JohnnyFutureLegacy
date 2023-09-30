const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  subTier: {
    type: Number,
    required: true,
    default: 0, //0 none, 1 educational, 2 editorial, 3 commercial
  },
  purchases: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Asset",
    },
  ],
  isInstit: {
    type: Boolean,
    default: false, // Default value is set to false, change as needed
  },
  userCollections: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Collection",
    },
  ],
});

const User = mongoose.model("User", userSchema);
module.exports = User;

