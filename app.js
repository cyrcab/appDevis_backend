require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const setupRoutes = require('./routes');

const app = express();

const { SERVER_PORT } = process.env;

// routes
setupRoutes(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// server setup
const server = app.listen(SERVER_PORT, () => {
  console.log(`Server is running on port ${SERVER_PORT}`);
});

module.exports = server;
