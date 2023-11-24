const mongoose = require('mongoose');
const { Schema } = mongoose;

const assetSchema = new Schema({
    assetName: {
        type: String,
        required: true
    },
    //the first array item is always the uploader's id, 
    // any other collaborators will be in other positions
    creatorName: [{
        type: mongoose.Schema.Types.ObjectId
    }],
    uploadDate: {
        type: Date,
        required: true
    },
    assetDescription: {
        type: String,
        default: "Description here",
    },
    assetPriceUSD: {
        type: Number,
        required: true
    },
    informationTags: [{
        type: String
    }],
    assetImage: {
        type: String,
        required: true
    },
    exifData: [{
        type: String
    }],
    collectionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Collection'
    }
});

const Asset = mongoose.model('Asset', assetSchema);

module.exports = Asset;
