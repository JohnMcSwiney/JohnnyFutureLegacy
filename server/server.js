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

const sharp = require('sharp');   // For image processing

// Allow requests from all origins during development (be more restrictive in production)
app.use(cors());

app.use(express.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploaded_files/');
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    // const splitName = file.originalname.split('.');
    cb(null, file.originalname);
  }
  
});

const upload = multer({ storage: storage });


app.post('/uploadimage', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file was uploaded.');
  }
  const userId = req.query.userId;
  const userDirectory = `uploaded_files/${userId}/`;
  const file = req.file;
  const splitName = file.originalname.split('.');
  // console.log(path)
  const fullResPath = path.join(userDirectory, splitName[0] + '_full.'+splitName[1]);
  const lowResPath = path.join(userDirectory, splitName[0] + '_low.'+splitName[1]);
  
  // const fullResPath = path.join('uploaded_files', splitName[0] + '_full.'+splitName[1]);
  // const lowResPath = path.join('uploaded_files', splitName[0] + '_low.'+splitName[1]);
  
  // const image = sharp(req.file.buffer)
  // const metadata = await image.metadata()
  // console.log(metadata.width, metadata.height)
  // Process and save the full-resolution image
  await sharp(file.path).toFile(fullResPath);
// obtain the size of an image

  // Process and save the low-resolution image
  await sharp(file.path)
    .resize(800) // Adjust the size as needed
    .toFile(lowResPath);

  // Delete the original uploaded file
  fs.unlinkSync(file.path);

  res.send(splitName[0] + '_low.'+splitName[1]);
});


// Function to check if a file is an image (you can expand this function to include more checks)
function isImageFile(file) {
  const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];
  const fileExtension = file.originalname.split('.').pop().toLowerCase();
  return allowedExtensions.includes(fileExtension);
}

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
