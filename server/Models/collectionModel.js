import mongoose, { trusted } from 'mongoose';
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
    collectionImages: [{
        image: {
            type: Image,
            imgName: {type: String, required: true}
        }
    }]
});

mongoose.model('Collection', collectionSchema);
