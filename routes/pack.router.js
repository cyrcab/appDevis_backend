import { Router } from 'express';
import {
  handleGetAllPacks,
  handleCreatePack,
  handleGetUniquePack,
  handleDeletePack,
} from '../controller/pack.controller';
import {
  packCreationValidation,
  packUpdateValidation,
} from '../middlewares/validation/pack.validation';

const packRouter = Router();

packRouter.route('/').get(handleGetAllPacks).post([packCreationValidation, handleCreatePack]);

packRouter.route('/:id').get(handleGetUniquePack).delete(handleDeletePack);
// categoryRouter.put('/:id', [categoryUpdateValidation, handleUpdateCategory]);

export default packRouter;
