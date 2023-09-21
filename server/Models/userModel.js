const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
username: {
    type: String,
    required: true
},
password: {
    type: String,
    required: true
},
firstName: {
    type: String,
    required: true
},
lastName: {
    type: String,
    required: true
},
userCollections: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Collection'
}]
});

const User = mongoose.model('User', userSchema);
module.exports = User;
