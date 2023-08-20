import mongoose, { trusted } from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
username: {
    type: String,
    required: true
},
password: {
    type: String,
    required
},
firstName: {
    type: String,
    required: true
},
lastName: {
    type: String,
    required: tre
},
userCollections: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Collection'
}]
});

mongoose.model('User', userSchema);
