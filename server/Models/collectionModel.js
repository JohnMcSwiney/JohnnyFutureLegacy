const mongoose = require('mongoose');
const { Schema } = mongoose;

const collectionSchema = new Schema({
    collectionName: {
        type: String,
        required: true
    },
    ownerName: {
        type: String
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
    }]
});

mongoose.model('Collection', collectionSchema);
