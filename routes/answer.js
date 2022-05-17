const answerRouter = require('express').Router();
const {
  handleCreateAnswer,
  handleGetAllAnswers,
  // handleGetUniqueAnswer,
  // handleDeleteAnswer,
  // handleUpdateAnswer,
} = require('../controller/answer');

answerRouter.post('/', handleCreateAnswer);
answerRouter.get('/', handleGetAllAnswers);
// answerRouter.get('/:id', handleGetUniqueAnswer);
// answerRouter.delete('/:id', handleDeleteAnswer);
// answerRouter.put('/:id', handleUpdateAnswer);

module.exports = answerRouter;
