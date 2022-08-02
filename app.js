import 'dotenv/config';
import express, { json, urlencoded } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { signup, signin, protect, checkUserRole, revokeToken, checkToken } from './services/auth';
import morgan from 'morgan';
import setupRoutes from './routes/index';
const app = express();
const { SERVER_PORT } = process.env;

// réglage des cors
app.use(cors({ credentials: true, origin: 'http://192.168.1.10:19006' }));
app.use(json());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(urlencoded({ extended: true }));

// auth
app.post('/signup', signup);
app.post('/signin', signin);
app.post('/signout', revokeToken);
app.get('/check-token', checkToken);

// routes
app.use('/api', [protect, checkUserRole]);
setupRoutes(app);

// server setup
const server = app.listen(SERVER_PORT, () => {
  console.log(`Server is running on port ${SERVER_PORT}`);
});

export default server;
