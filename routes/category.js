const categoryRouter = require('express').Router();
const {
  handleCreateCategory,
  handleGetAllCategories,
  handleGetUniqueCategory,
  handleDeleteCategory,
  handleUpdateCategory,
} = require('../controller/category');

categoryRouter.post('/', handleCreateCategory);
categoryRouter.get('/', handleGetAllCategories);
categoryRouter.get('/:id', handleGetUniqueCategory);
categoryRouter.delete('/:id', handleDeleteCategory);
categoryRouter.put('/:id', handleUpdateCategory);

module.exports = categoryRouter;
