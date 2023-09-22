const mongoose = require('mongoose');
const { Schema } = mongoose;

const assetSchema = new Schema({
    assetName: {
        type: String,
        required: true
    },
    createrName: [{
        type: String
    }],
    uploadDate: {
        type: Date,
        required: true
    },
    assetDesciption: {
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
        type: URL,
        required: true
    }
});

mongoose.model('Asset', assetSchema);
