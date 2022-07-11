import { Router } from 'express';
import {
  handleGetAllPacks,
  handleCreatePack,
  handleGetUniquePack,
} from '../controller/pack.controller';
import {
  packCreationValidation,
  packUpdateValidation,
} from '../middlewares/validation/pack.validation';

const packRouter = Router();

packRouter.get('/', handleGetAllPacks).post('/', [packCreationValidation, handleCreatePack]);

packRouter.get('/:id', handleGetUniquePack);
// categoryRouter.delete('/:id', handleDeleteCategory);
// categoryRouter.put('/:id', [categoryUpdateValidation, handleUpdateCategory]);

export default packRouter;
