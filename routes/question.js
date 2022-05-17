const questionRouter = require('express').Router();
const {
  handleCreateQuestion,
  // handleGetAllQuestions,
  // handleGetUniqueQuestion,
  // handleDeleteQuestion,
  // handleUpdateQuestion,
} = require('../controller/question');

questionRouter.post('/', handleCreateQuestion);
// questionRouter.get('/', handleGetAllQuestions);
// questionRouter.get('/:id', handleGetUniqueQuestion);
// questionRouter.delete('/:id', handleDeleteQuestion);
// questionRouter.put('/:id', handleUpdateQuestion);

module.exports = questionRouter;