const mongoose = require('mongoose');
const { Schema } = mongoose;

const collectionSchema = new Schema({
    collectionName: {
        type: String,
        required: true
    },
    ownerName: {
        type: mongoose.Schema.Types.ObjectId
    },
    collectionDate: {
        type: Date,
        required: true
    },
    collectionDescription: {
        type: String
    },
    collectionAssets: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Asset'
    }],
    collectionImage: {
        type: String, // Store the URL or reference to the collection image
    }
});

const Collection = mongoose.model('Collection', collectionSchema);
module.exports = Collection;