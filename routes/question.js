const questionRouter = require('express').Router();
const {
  handleCreateQuestion,
  handleGetAllQuestions,
  handleGetUniqueQuestion,
  handleDeleteQuestion,
  handleUpdateQuestion,
  handleGetAllAnswerbyQuestion,
} = require('../controller/question');
const {
  questionCreationValidation,
  questionUpdateValidation,
} = require('../middlewares/validation/question');

questionRouter.post('/', [questionCreationValidation, handleCreateQuestion]);
questionRouter.get('/', handleGetAllQuestions);
questionRouter.get('/:id', handleGetUniqueQuestion);
questionRouter.get('/:id/answers', handleGetAllAnswerbyQuestion);
questionRouter.delete('/:id', handleDeleteQuestion);
questionRouter.put('/:id', [questionUpdateValidation, handleUpdateQuestion]);

module.exports = questionRouter;
