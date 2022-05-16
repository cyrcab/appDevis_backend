const userRouter = require('express').Router();
const {
  handleCreateUser,
  handleGetAllUsers,
  handleGetUniqueUser,
  handleDeleteUser,
  handleUpdateUser,
} = require('../controller/user');

userRouter.post('/create', handleCreateUser);
userRouter.get('/', handleGetAllUsers);
userRouter.get('/:id', handleGetUniqueUser);
userRouter.delete('/:id', handleDeleteUser);
userRouter.put('/:id', handleUpdateUser);

module.exports = userRouter;
