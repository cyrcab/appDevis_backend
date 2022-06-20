const categoryRouter = require('express').Router();
const {
  handleCreateCategory,
  handleGetAllCategories,
  handleGetUniqueCategory,
  handleDeleteCategory,
  handleUpdateCategory,
  handleGetAllQuestionsByCategory
} = require('../controller/category');
const {
  categoryCreationValidation,
  categoryUpdateValidation,
} = require('../middlewares/validation/category');

categoryRouter.post('/', [categoryCreationValidation, handleCreateCategory]);
categoryRouter.get('/', handleGetAllCategories);
categoryRouter.get('/:id', handleGetUniqueCategory);
categoryRouter.get('/:id/questions', handleGetAllQuestionsByCategory);
categoryRouter.delete('/:id', handleDeleteCategory);
categoryRouter.put('/:id', [categoryUpdateValidation, handleUpdateCategory]);

module.exports = categoryRouter;
