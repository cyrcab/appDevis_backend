import { Router } from 'express';
import { handleCreateOption, handleGetAllOptions } from '../controller/option.controller';
// const {
//   answerCreationValidation,
//   answerUpdateValidation,
// } = require('../middlewares/validation/answer');

const answerRouter = Router();

answerRouter.post('/', handleCreateOption).get('/', handleGetAllOptions);

// answerRouter
//   .get('/:id', handleGetUniqueAnswer)
//   .delete('/:id', handleDeleteAnswer)
//   .put('/:id', [answerUpdateValidation, handleUpdateAnswer]);

export default answerRouter;
