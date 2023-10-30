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
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploaded_files/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post('/uploadimage', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  // Extract the userId from the query parameter
  const userId = req.query.userId;

  // Generate a new filename based on userId and original filename
  // const newFilename = generateNewFilename(userId, req.file.originalname);

  // Create the user-specific directory
const userDirectory = `uploaded_files/${userId}/`;
if (!fs.existsSync(userDirectory)) {
  fs.mkdirSync(userDirectory, { recursive: true });
}

const newFilename = generateNewFilename(userId, req.file.originalname);
  const newPath = `${userDirectory}${newFilename}`;
  let version = 2; // Start with version 2

  while (fs.existsSync(newPath)) {
    // A file with the same name exists, increment the version
    newFilename = generateNewFilename(userId, `${req.file.originalname}_v${version}`);
    newPath = `${userDirectory}${newFilename}`;
    version++;
  }

  // Move the uploaded file to the user-specific directory and filename
  fs.renameSync(req.file.path, newPath);

  res.send(`File uploaded as version ${version}: ${newFilename}`);
});

function generateNewFilename(userId, originalFilename, version = '') {
  const timestamp = new Date().getTime();
  return `${userId}_${timestamp}_${originalFilename}${version ? `_v${version}` : ''}`;
  // return `${userId}_${originalFilename}${version ? `_v${version}` : ''}`;
}

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
