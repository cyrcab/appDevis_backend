const userRouter = require('express').Router();
const { handleCreateUser, handleGetAllUsers } = require('../controller/user');

// userRouter.get('/', handleGetUser);
userRouter.post('/create', handleCreateUser);
userRouter.get('/', handleGetAllUsers);

module.exports = userRouter;
