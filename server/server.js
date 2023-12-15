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

require('dotenv').config();

const app = express();
const port = process.env.PORT || 443;

// Increase payload size limit for body-parser
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

// Allow requests from all origins during development (be more restrictive in production)
app.use(cors());

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

app.post('/uploadimage', upload.single('file'), async (req, res) => {
  // ... (unchanged code for file upload)
});

// ... (unchanged code for other routes)

// Load SSL/TLS certificate and private key
const privateKeyPath = process.env.PRIVATE_KEY_PATH || '/path/to/private-key.pem';
const certificatePath = process.env.CERTIFICATE_PATH || '/path/to/certificate.pem';

const privateKey = fs.readFileSync(privateKeyPath, 'utf8');
const certificate = fs.readFileSync(certificatePath, 'utf8');
const credentials = { key: privateKey, cert: certificate };

// Create an HTTPS server
const httpsServer = https.createServer(credentials, app);

httpsServer.listen(port, () => {
  console.log(`Server is running on https://localhost:${port}`);
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