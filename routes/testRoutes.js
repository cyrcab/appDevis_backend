const testRouter = require('express').Router();
const testRoute = require('../controller/testApi')

testRouter.get('/', testRoute)

module.exports = testRouter;