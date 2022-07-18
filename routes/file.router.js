import { Router } from 'express';
import {
  createFile,
  getManyFile,
  deleteFile,
  updateFile,
} from '../controller/file.controller';

const fileRouter = Router();

fileRouter.route('/').post(createFile).get(getManyFile);

fileRouter.route('/:id').delete(deleteFile).put(updateFile);

export default fileRouter;
