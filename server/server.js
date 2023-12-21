const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const https = require('https');
const fs = require('fs');
const sharp = require('sharp');
const piexif = require('piexifjs');
const mongoose = require('mongoose');

const app = express();

// Increase payload size limit for body-parser
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

// Allow requests from all origins during development (be more restrictive in production)
app.use(cors());

// Load environment variables from .env file
require('dotenv').config();

// Read certificate and private key files
const privateKey = fs.readFileSync('/etc/letsencrypt/archive/futurelegacy.mcswineyprogramming.net/privkey1.pem', 'ASCII');
const certificate = fs.readFileSync('/etc/letsencrypt/archive/futurelegacy.mcswineyprogramming.net/cert1.pem', 'ASCII');

const credentials = { key: privateKey, cert: certificate };

// Define your Express routes and middleware here


// Your routes
const userRoute = require('./routes/userRoute');
const collectionRoute = require('./routes/collectionRoute');
const assetRoute = require('./routes/assetRoute');
const searchRoute = require('./routes/searchRoute');
const featuredRoute = require('./routes/featuredCollectionRoute');
const authRoute = require('./routes/authRoute');

// File upload configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploaded_files/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

app.get('/', (req, res) => {
  res.send(`Hello, you're accessing the Future Legacy Backend Server`);
});

app.post('/uploadimage', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file was uploaded.');
  }
  const userId = req.query.userId;
  const userDirectory = `uploaded_files/${userId}/`;
  const file = req.file;
  let fileExifData = [{}];

  //Exif parser
  const imageBuffer = fs.readFileSync(file.path);
  // Extract EXIF data
  try {
    const exifData = piexif.load(imageBuffer.toString('binary'));
    // console.log('piexif')
    // console.log('EXIF Data:', exifData);
    fileExifData = exifData;
  } catch (error) {
    console.error('Error reading EXIF data:', error.message);
  }


  const splitName = file.originalname.split('.');
  // console.log(path)
  const fullResPath = path.join(userDirectory, splitName[0] + '_full.'+splitName[1]);
  const lowResPath = path.join(userDirectory, splitName[0] + '_low.'+splitName[1]);
  
  // const fullResPath = path.join('uploaded_files', splitName[0] + '_full.'+splitName[1]);
  // const lowResPath = path.join('uploaded_files', splitName[0] + '_low.'+splitName[1]);
  
  await sharp(file.path).toFile(fullResPath);

  // Process and save the low-resolution image
  await sharp(file.path)
    .resize(800) // Adjust the size as needed
    .toFile(lowResPath);
  // Delete the original uploaded file
  fs.unlinkSync(file.path);

  
  //send low res version to front
  res.send(splitName[0] + '_low.'+splitName[1]);

  const jsonFilePath = userDirectory + splitName[0] + '_' + splitName[1] + '_data.json'

  const jsonData = {content:fileExifData}

  const jsonString = JSON.stringify(jsonData);

  fs.writeFile(jsonFilePath, jsonString, 'utf-8', (err) => {
    if (err) {
      console.error('Error writing JSON file:', err);
    } else {
      console.log('JSON file: ' + splitName[0] + '_' + splitName[1] + '_data.json' +' has been saved.' );
    }
  });
});

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

app.get('/getimageData', (req, res) => {
  const userId = req.query.userId;
  const filename = req.query.filename;

  if (!userId || !filename) {
    return res.status(400).send('Invalid request. Provide both userId and filename.');
  }

  const userDirectory = `uploaded_files/${userId}/`;
  const splitName = filename.split('.');
  const jsonFileName = splitName[0] + '_' + splitName[1] + '_data.json';
  const imagePath = path.join(__dirname, userDirectory, jsonFileName); // Construct an absolute path

  
  // console.log('JSON file: ' + splitName[0] + '_' + splitName[1] + '_data.json' );
  if (fs.existsSync(imagePath)) {
    res.sendFile(imagePath);
  } else {
    res.status(404).send('File not found.');
  }
});



// Connection URL
const url = 'mongodb+srv://FutureLegacyDB:PZj9BE7zbANQhXb@futurelegacy.yiwwjmj.mongodb.net/?retryWrites=true&w=majority';

// Connect to the database
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB using Mongoose');
});

app.use(express.json());
app.use('/api/user', userRoute);
app.use('/api/collection', collectionRoute);
app.use('/api/asset', assetRoute);
app.use('/api/search', searchRoute);
app.use('/api/featured', featuredRoute);
app.use('/api/auth', authRoute);
app.use('/uploaded_files', express.static(path.join(__dirname, 'uploaded_files')));

// Create an HTTPS server with Express
const httpsServer = https.createServer(credentials, app);

// Start the server
const PORT = 5000;
// const HOST = '0.0.0.0'; // Listen on all available network interfaces
const HOST = '3.140.207.175';
httpsServer.listen(PORT, 
  // HOST, 
  () => {
  console.log(`Server running on https://${HOST}:${PORT}`);
});