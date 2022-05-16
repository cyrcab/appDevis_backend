const userRouter = require('express').Router();
const { handleCreateUser, handleGetAllUsers, handleGetUniqueUser } = require('../controller/user');

// userRouter.get('/', handleGetUser);
userRouter.post('/create', handleCreateUser);
userRouter.get('/', handleGetAllUsers);
userRouter.get('/:id', handleGetUniqueUser);

module.exports = userRouter;
