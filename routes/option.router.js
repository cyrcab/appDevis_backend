import { Router } from 'express';
import {
  handleCreateOption,
  handleGetAllOptions,
  handleGetUniqueOption,
} from '../controller/option.controller';
import { optionCreationValidation } from '../middlewares/validation/option.validation';

const answerRouter = Router();

answerRouter
  .post('/', [optionCreationValidation, handleCreateOption])
  .get('/', handleGetAllOptions);

answerRouter.get('/:id', handleGetUniqueOption);
//   .delete('/:id', handleDeleteAnswer)
//   .put('/:id', [answerUpdateValidation, handleUpdateAnswer]);

export default answerRouter;
