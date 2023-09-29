const mongoose = require('mongoose');
const { Schema } = mongoose;

const assetSchema = new Schema({
    assetName: {
        type: String,
        required: true
    },
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
    assetImage:
    {
        type: String,
        required: true
    }
});

const Asset = mongoose.model('Asset', assetSchema);

module.exports = Asset;
