import { Router } from 'express';
import {
  createFile,
  getManyFile,
  getUniqFile,
  deleteFile,
  updateFile,
} from '../controller/file.controller';

const fileRouter = Router();

fileRouter.route('/').post(createFile).get(getManyFile);

fileRouter.route('/:id').get(getUniqFile).delete(deleteFile).put(updateFile);

export default fileRouter;
