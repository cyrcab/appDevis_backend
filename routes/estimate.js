const estimateRouter = require('express').Router();
const {
  handleCreateEstimate,
  handleGetAllEstimate,
  handleDeleteEstimate,
  handleUpdateEstimate
} = require('../controller/estimate');

estimateRouter.post('/', handleCreateEstimate);
estimateRouter.get('/', handleGetAllEstimate);
estimateRouter.delete('/:id', handleDeleteEstimate);
estimateRouter.put('/:id', handleUpdateEstimate);

module.exports = estimateRouter;
