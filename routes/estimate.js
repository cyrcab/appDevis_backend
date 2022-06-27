const estimateRouter = require('express').Router();
const { handleCreateEstimate } = require('../controller/estimate');

estimateRouter.post('/', handleCreateEstimate);

module.exports = estimateRouter;
