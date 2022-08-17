import { Router } from 'express';
import {
  handleGetAllPacks,
  handleCreatePack,
  handleGetUniquePack,
  handleDeletePack,
  handleUpdatePack,
} from '../controller/pack.controller.js';
import {
  packCreationValidation,
  packUpdateValidation,
} from '../middlewares/validation/pack.validation.js';

const packRouter = Router();

packRouter.route('/').get(handleGetAllPacks).post([packCreationValidation, handleCreatePack]);

packRouter
  .route('/:id')
  .get(handleGetUniquePack)
  .delete(handleDeletePack)
  .put([packUpdateValidation, handleUpdatePack]);

export default packRouter;
