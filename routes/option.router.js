import { Router } from 'express';
import {
  handleCreateOption,
  handleGetAllOptions,
  handleGetUniqueOption,
  handleDeleteOption,
} from '../controller/option.controller';
import { optionCreationValidation } from '../middlewares/validation/option.validation';

const answerRouter = Router();

answerRouter
  .post('/', [optionCreationValidation, handleCreateOption])
  .get('/', handleGetAllOptions);

answerRouter.get('/:id', handleGetUniqueOption).delete('/:id', handleDeleteOption);
//   .put('/:id', [answerUpdateValidation, handleUpdateAnswer]);

export default answerRouter;
