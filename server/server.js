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

// Load environment variables from .env file
require('dotenv').config();

// Read certificate and private key files
const privateKey = fs.readFileSync('/etc/letsencrypt/archive/futurelegacy.mcswineyprogramming.net/privkey1.pem', 'ASCII');
const certificate = fs.readFileSync('/etc/letsencrypt/archive/futurelegacy.mcswineyprogramming.net/cert1.pem', 'ASCII');

const credentials = { key: privateKey, cert: certificate };

// Define your Express routes and middleware here

// Example route
app.get('/', (req, res) => {
  res.send('Hello, HTTPS World!');
});

// Create an HTTPS server with Express
const httpsServer = https.createServer(credentials, app);

// Start the server
const PORT = 5000;
const HOST = '0.0.0.0'; // Listen on all available network interfaces
httpsServer.listen(PORT, HOST, () => {
  console.log(`Server running on https://${HOST}:${PORT}`);
});
