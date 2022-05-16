const categoryRouter = require('express').Router();
const { handleCreateCategory, handleGetAllCategories } = require('../controller/category');

categoryRouter.post('/', handleCreateCategory);
categoryRouter.get('/', handleGetAllCategories);
// categoryRouter.get('/:id', );
// categoryRouter.delete('/:id', );
// categoryRouter.put('/:id', );

module.exports = categoryRouter;
