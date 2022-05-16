const categoryRouter = require('express').Router();
const { handleCreateCategory } = require('../controller/category');

categoryRouter.post('/', handleCreateCategory);
// categoryRouter.get('/', );
// categoryRouter.get('/:id', );
// categoryRouter.delete('/:id', );
// categoryRouter.put('/:id', );

module.exports = categoryRouter;
