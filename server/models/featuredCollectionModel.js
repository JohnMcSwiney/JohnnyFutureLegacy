const mongoose = require("mongoose");
const { Schema } = mongoose;

const featuredCollectionModel = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  connectedCollectionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Collection", // Reference to the Collections model
    required: true,
  },
  videoLink: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  importance: {
    type: Number,
    required: true,
    min: 1, // Minimum importance level
    max: 6, // Maximum importance level
  },
});

const FeaturedCollection = mongoose.model(
  "FeaturedCollection",
  featuredCollectionModel
);

module.exports = FeaturedCollection;
