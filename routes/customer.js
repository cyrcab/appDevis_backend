const customerRouter = require('express').Router();
const { handleCreateCustomer } = require('../controller/customer');

customerRouter.post('/', handleCreateCustomer);

module.exports = customerRouter;
