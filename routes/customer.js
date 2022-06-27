const customerRouter = require('express').Router();
const { handleCreateCustomer } = require('../controller/category');

categoryRouter.post('/', handleCreateCustomer);

module.exports = customerRouter;
