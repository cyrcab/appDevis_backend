const answerRouter = require('express').Router();
const {
  handleCreateAnswer,
  handleGetAllAnswers,
  handleGetUniqueAnswer,
  handleDeleteAnswer,
  handleUpdateAnswer,
} = require('../controller/answer');
const {
  answerCreationValidation,
  answerUpdateValidation,
} = require('../middlewares/validation/answer');

answerRouter.post('/', [answerCreationValidation, handleCreateAnswer]);
answerRouter.get('/', handleGetAllAnswers);
answerRouter.get('/:id', handleGetUniqueAnswer);
answerRouter.delete('/:id', handleDeleteAnswer);
answerRouter.put('/:id', [answerUpdateValidation, handleUpdateAnswer]);

module.exports = answerRouter;
