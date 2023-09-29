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
//Add emails
//Add subTier (default 0,1,2,3)

//More requests <3
//Add purchases, an individual asset[]
//Also add a variable to denote whether a user is a museum or not, 
// -> a simple boolean will suffice. isInstit 
//     (I want this for front end UI changes)
// Thx ily <3
