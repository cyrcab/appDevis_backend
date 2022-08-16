import { Router } from 'express';
import {
  handleCreateOption,
  handleGetAllOptions,
  handleGetUniqueOption,
  handleDeleteOption,
  handleUpdateOption,
} from '../controller/option.controller.js';
import {
  optionCreationValidation,
  optionUpdateValidation,
} from '../middlewares/validation/option.validation.js';

const answerRouter = Router();

answerRouter
  .route('/')
  .post([optionCreationValidation, handleCreateOption])
  .get(handleGetAllOptions);

answerRouter
  .route('/:id')
  .get(handleGetUniqueOption)
  .delete(handleDeleteOption)
  .put([optionUpdateValidation, handleUpdateOption]);

export default answerRouter;
