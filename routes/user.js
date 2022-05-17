const userRouter = require('express').Router();
const {
  createUser,
  getAllUsers,
  getUniqueUser,
  deleteUser,
  updateUser,
  loginUser,
} = require('../controller/user');

userRouter.post('/', createUser);
userRouter.post('/login', loginUser);
userRouter.get('/', getAllUsers);
userRouter.get('/:id', getUniqueUser);
userRouter.delete('/:id', deleteUser);
userRouter.put('/:id', updateUser);

module.exports = userRouter;
