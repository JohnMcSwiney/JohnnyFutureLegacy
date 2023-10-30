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

  const userId = req.query.userId;
  const userDirectory = `uploaded_files/${userId}/`;
  const originalFilename = req.file.originalname;
  const splitName = originalFilename.split('.');
  const fileExtension = splitName[1];

  let version = 0;
  let newFilename = generateNewFilename(userId, splitName[0], fileExtension, version);

  while (fs.existsSync(`${userDirectory}${newFilename}`)) {
    version++;
    newFilename = generateNewFilename(userId, splitName[0], fileExtension, version);
  }

  const newPath = `${userDirectory}${newFilename}`;
  fs.renameSync(req.file.path, newPath);

  res.send(newFilename);
});

function generateNewFilename(userId, filename, fileExtension, version) {
  if (version > 0) {
    return `${userId}_${filename}(${version}).${fileExtension}`;
  } else {
    return `${userId}_${filename}.${fileExtension}`;
  }
}
app.get('/getimage', (req, res) => {
  const userId = req.query.userId;
  const filename = req.query.filename;

  if (!userId || !filename) {
    return res.status(400).send('Invalid request. Provide both userId and filename.');
  }

  const userDirectory = `uploaded_files/${userId}/`;
  const imagePath = path.join(__dirname, userDirectory, filename); // Construct an absolute path

  if (fs.existsSync(imagePath)) {
    res.sendFile(imagePath);
  } else {
    res.status(404).send('File not found.');
  }
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
