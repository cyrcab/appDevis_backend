import { Router } from 'express';
import {
  handleCreateOption,
  handleGetAllOptions,
  handleGetUniqueOption,
  handleDeleteOption,
  handleUpdateOption,
} from '../controller/option.controller';
import {
  optionCreationValidation,
  optionUpdateValidation,
} from '../middlewares/validation/option.validation';

const answerRouter = Router();

answerRouter
  .post('/', [optionCreationValidation, handleCreateOption])
  .get('/', handleGetAllOptions);

answerRouter
  .get('/:id', handleGetUniqueOption)
  .delete('/:id', handleDeleteOption)
  .put('/:id', [optionUpdateValidation, handleUpdateOption]);

export default answerRouter;
