import 'dotenv/config';
import express, { json, urlencoded } from 'express';
import cors from 'cors';
import * as fs from 'fs';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import { signup, signin, protect, checkUserRole, revokeToken, checkToken } from './services/auth';
import morgan from 'morgan';
import setupRoutes from './routes/index';
import { createPdf } from './services/pdf/pdfGenerator.js';
const app = express();
const { SERVER_PORT } = process.env;

// réglage des cors
app.use(cors({ credentials: true, origin: 'http://172.20.10.2:19006' }));
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
app.post('/signup', signup);
app.post('/signin', signin);
app.post('/signout', revokeToken);
app.get('/check-token', checkToken);
app.post('/upload-pdf', createPdf, async (req, res) => {
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
});

// routes
app.use('/api', [protect, checkUserRole]);
setupRoutes(app);

// server setup
const server = app.listen(SERVER_PORT, () => {
  console.log(`Server is running on port ${SERVER_PORT}`);
});

export default server;
