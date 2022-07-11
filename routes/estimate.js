const estimateRouter = require('express').Router();
const {
  handleCreateEstimate,
  handleGetAllEstimate,
  handleDeleteEstimate,
  handleUpdateEstimate,
} = require('../controller/estimate');

estimateRouter.post('/', handleCreateEstimate).get('/', handleGetAllEstimate);

estimateRouter.delete('/:id', handleDeleteEstimate).put('/:id', handleUpdateEstimate);

module.exports = estimateRouter;
