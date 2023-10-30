const express = require('express')
const app = express()
const port = 5000;
const mongoose = require('mongoose');
const userRoute= require('./routes/userRoute')
const collectionRoute= require('./routes/collectionRoute');
const assetRoute = require('./routes/assetRoute');
const searchRoute = require('./routes/searchRoute');
const featuredRoute = require('./routes/featuredCollectionRoute');
const cors = require('cors');
const multer = require("multer");
const path = require('path'); 
const fs = require('fs');

// Allow requests from all origins during development (be more restrictive in production)
app.use(cors());

app.use(express.json());

// Create a directory for storing uploaded files (if it doesn't exist)
const storageDirectory = 'uploaded_files';
if (!fs.existsSync(storageDirectory)) {
  fs.mkdirSync(storageDirectory);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, storageDirectory); // Define the directory to store uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.post('/uploadimage', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  // You can now respond with a success message or do further processing if needed
  res.send('File uploaded and saved successfully!');
});

app.listen(port, () => {
  console.log('Server started on port: ' + port + '!');
});

// Connection URL
// Title of db, pz: password 
const url = 'mongodb+srv://FutureLegacyDB:PZj9BE7zbANQhXb@futurelegacy.yiwwjmj.mongodb.net/?retryWrites=true&w=majority';

// Connect to the database
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB using Mongoose');
  
});



app.use(express.json())
app.use('/api/user', userRoute);
app.use('/api/collection', collectionRoute);
app.use('/api/asset', assetRoute);
app.use('/api/search', searchRoute);
app.use('/api/featured', featuredRoute);
