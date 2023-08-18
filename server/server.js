const express = require('express')
const app = express()
const port = 5000;
const mongoose = require('mongoose');

app.get("/api", (req, res) => {
    res.json({"users": ["user1", "user2", "user3"]})
})

app.listen(port, () =>{console.log("Server started on port: " + port +"!")})



// Connection URL
const url = 'mongodb+srv://FutureLegacyDB:PZj9BE7zbANQhXb@futurelegacy.yiwwjmj.mongodb.net/?retryWrites=true&w=majority';

// Connect to the database
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB using Mongoose');
});
