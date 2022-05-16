const userRouter = require('express').Router();
const {
  handleCreateUser,
  handleGetAllUsers,
  handleGetUniqueUser,
  handleDeleteUser,
} = require('../controller/user');

userRouter.post('/create', handleCreateUser);
userRouter.get('/', handleGetAllUsers);
userRouter.get('/:id', handleGetUniqueUser);
userRouter.delete('/:id', handleDeleteUser);

module.exports = userRouter;
