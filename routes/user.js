const userRouter = require('express').Router();
const { handleCreateUser, handleGetAllUsers, getUniqueUser } = require('../controller/user');

// userRouter.get('/', handleGetUser);
userRouter.post('/create', handleCreateUser);
userRouter.get('/', handleGetAllUsers);
userRouter.get('/:id', getUniqueUser);

module.exports = userRouter;
