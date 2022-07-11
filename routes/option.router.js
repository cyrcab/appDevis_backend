import { Router } from 'express';
import { handleCreateOption, handleGetAllOptions } from '../controller/option.controller';
import { optionCreationValidation } from '../middlewares/validation/option.validation';

const answerRouter = Router();

answerRouter
  .post('/', [optionCreationValidation, handleCreateOption])
  .get('/', handleGetAllOptions);

// answerRouter
//   .get('/:id', handleGetUniqueAnswer)
//   .delete('/:id', handleDeleteAnswer)
//   .put('/:id', [answerUpdateValidation, handleUpdateAnswer]);

export default answerRouter;
