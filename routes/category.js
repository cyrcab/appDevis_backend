const categoryRouter = require('express').Router();
const {
  handleCreateCategory,
  handleGetAllCategories,
  handleGetUniqueCategory,
} = require('../controller/category');

categoryRouter.post('/', handleCreateCategory);
categoryRouter.get('/', handleGetAllCategories);
categoryRouter.get('/:id', handleGetUniqueCategory);
// categoryRouter.delete('/:id', );
// categoryRouter.put('/:id', );

module.exports = categoryRouter;
