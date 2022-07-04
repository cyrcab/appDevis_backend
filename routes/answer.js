const answerRouter = require('express').Router();
const {
  handleCreateAnswer,
  handleGetAllAnswers,
  handleGetUniqueAnswer,
  handleDeleteAnswer,
  handleUpdateAnswer,
  handleGetAllAnswersOrderedByDate,
  // handleCreateAnswerByEstimate,
} = require('../controller/answer');
const {
  answerCreationValidation,
  answerUpdateValidation,
} = require('../middlewares/validation/answer');

answerRouter.post('/', handleCreateAnswer);
// answerRouter.post('/linked=estimate', handleCreateAnswerByEstimate);
answerRouter.get('/', handleGetAllAnswers);
answerRouter.get('/sort_by=date&order_by=desc&limit=:number', handleGetAllAnswersOrderedByDate);
answerRouter.get('/:id', handleGetUniqueAnswer);
answerRouter.delete('/:id', handleDeleteAnswer);
answerRouter.put('/:id', [answerUpdateValidation, handleUpdateAnswer]);

module.exports = answerRouter;
