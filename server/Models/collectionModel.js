const mongoose = require('mongoose');
const { Schema } = mongoose;

const collectionSchema = new Schema({
    collectionName: {
        type: String,
        required: true
    },
    collectionDate: {
        type: Date,
        required: true
    },
    collectionDescription: {
        type: String
    },
    collectionImages: [{
        // image: {
        //     type: Image,
        //     imgName: {type: String, required: true}
        // }
    }]
});

mongoose.model('Collection', collectionSchema);
