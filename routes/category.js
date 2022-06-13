const categoryRouter = require('express').Router();
const {
  handleCreateCategory,
  handleGetAllCategories,
  handleGetUniqueCategory,
  handleDeleteCategory,
  handleUpdateCategory,
  handleGetQuestionsForCategory
} = require('../controller/category');
const {
  categoryCreationValidation,
  categoryUpdateValidation,
} = require('../middlewares/validation/category');

categoryRouter.post('/', [categoryCreationValidation, handleCreateCategory]);
categoryRouter.get('/', handleGetAllCategories);
categoryRouter.get('/:id', handleGetUniqueCategory);
categoryRouter.get('/:id/questions', handleGetQuestionsForCategory);
categoryRouter.delete('/:id', handleDeleteCategory);
categoryRouter.put('/:id', [categoryUpdateValidation, handleUpdateCategory]);

module.exports = categoryRouter;
