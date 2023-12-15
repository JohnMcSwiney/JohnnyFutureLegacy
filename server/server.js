const express = require('express');
const https = require('https');
const fs = require('fs');

const app = express();

// Load environment variables from .env file
require('dotenv').config();
// /etc/letsencrypt/archive/futurelegacy.mcswineyprogramming.net/cert1.pem
// /etc/letsencrypt/archive/futurelegacy.mcswineyprogramming.net/privkey1.pem
// Read certificate and private key files
const privateKey = fs.readFileSync('/etc/letsencrypt/archive/futurelegacy.mcswineyprogramming.net/cert1.pem', 'ASCII');
const certificate = fs.readFileSync('/etc/letsencrypt/archive/futurelegacy.mcswineyprogramming.net/privkey1.pem', 'ASCII');

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
