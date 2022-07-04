const estimateRouter = require('express').Router();
const {
  handleCreateEstimate,
  handleGetAllEstimate,
  handleDeleteEstimate,
} = require('../controller/estimate');

estimateRouter.post('/', handleCreateEstimate);
estimateRouter.get('/', handleGetAllEstimate);
estimateRouter.delete('/:id', handleDeleteEstimate);

module.exports = estimateRouter;
