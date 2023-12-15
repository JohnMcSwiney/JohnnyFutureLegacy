const express = require('express');
const https = require('https');
const fs = require('fs');

const app = express();

// Load environment variables from .env file
require('dotenv').config();

// Read certificate and private key files
const privateKey = fs.readFileSync(process.env.PRIVATE_KEY_PATH, 'ASCII');
const certificate = fs.readFileSync(process.env.CERTIFICATE_PATH, 'ASCII');

const credentials = { key: privateKey, cert: certificate };

console.log(credentials);
// Define your Express routes and middleware here

// Example route
app.get('/', (req, res) => {
  res.send('Hello, HTTPS World!');
});

// Create an HTTPS server with Express
const httpsServer = https.createServer(credentials, app);

// Start the server
const PORT = 443;
const HOST = '0.0.0.0'; // Listen on all available network interfaces
httpsServer.listen(PORT, HOST, () => {
  console.log(`Server running on https://${HOST}:${PORT}`);
});
