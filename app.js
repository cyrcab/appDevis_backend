require('dotenv').config();
const express = require('express');
const cors = require('cors');
const setupRoutes = require('./routes');
const app = express();
const { SERVER_PORT } = process.env;

// réglage des cors
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
setupRoutes(app);

// server setup
const server = app.listen(SERVER_PORT, () => {
  console.log(`Server is running on port ${SERVER_PORT}`);
});

module.exports = server;
