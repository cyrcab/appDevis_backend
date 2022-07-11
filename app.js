import 'dotenv/config';
import express, { json, urlencoded } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import setupRoutes from './routes/index';
const app = express();
const { SERVER_PORT } = process.env;

// réglage des cors
app.use(cors());
app.use(json());
app.use(morgan('dev'));
app.use(urlencoded({ extended: true }));

// routes
setupRoutes(app);

// server setup
const server = app.listen(SERVER_PORT, () => {
  console.log(`Server is running on port ${SERVER_PORT}`);
});

export default server;
