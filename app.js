import 'dotenv/config';
import express, { json, urlencoded } from 'express';
import cors from 'cors';
import * as fs from 'fs';
import cookieParser from 'cookie-parser';
import { logger } from './middlewares/logger.js';
import fileUpload from 'express-fileupload';
import {
  signup,
  signin,
  protect,
  checkUserRole,
  revokeToken,
  checkToken,
} from './services/auth.js';
import morgan from 'morgan';
import setupRoutes from './routes/index.js';
import { createPdf } from './services/pdf/pdfGenerator.js';
const app = express();
const { SERVER_PORT } = process.env;

// réglage des cors
app.use(cors({ credentials: true, origin: 'https://app-devis-test.herokuapp.com/' }));
app.use(json());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
app.use(
  fileUpload({
    createParentPath: true,
  })
);
app.use(express.static('./services/pdf/uploads'));

// auth
// app.post('/signup', signup);
app.post('/signin', signin);
app.post('/signout', revokeToken);
app.get('/check-token', checkToken);
app.get('/', async (req, res, next) => {
  try {
    return res.status(200).send('ok');
  } catch (error) {
    next(error);
    return res.status(500).end();
  }
});
app.post('/upload-pdf', [
  protect,
  createPdf,
  async (req, res) => {
    try {
      var oldPath = './services/pdf/document/test.pdf';
      var newPath = './services/pdf/uploads/test.pdf';

      const file = fs.readFileSync('./services/pdf/document/test.pdf');
      if (!file) {
        res.send({
          status: false,
          message: 'No file uploaded',
        });
      } else {
        fs.rename(oldPath, newPath, function (err) {
          if (err) throw err;
          console.log('Successfully renamed - AKA moved!');
        });

        //send response
        res.send({
          status: true,
          message: 'File is uploaded',
          data: {
            name: file.name,
            mimetype: file.mimetype,
            size: file.size,
          },
        });
      }
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  },
]);

// routes
app.use('/api', [protect, checkUserRole]);
setupRoutes(app);

app.use((err, req, res, next) => {
  logger.error(err);
  return res.status(500).end();
});

// server setup
const server = app.listen(SERVER_PORT || process.env.PORT, () => {
  console.log(`Server is running on port ${SERVER_PORT || process.env.PORT}`);
});

export default server;
