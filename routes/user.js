const userRouter = require('express').Router();
const {
  createUser,
  getAllUsers,
  getUniqueUser,
  deleteUser,
  updateUser,
  loginUser,
} = require('../controller/user');
const { userCreationValidation, userUpdateValidation } = require('../middlewares/validation/user');

userRouter.post('/', [userCreationValidation, createUser]);
userRouter.post('/login', loginUser);
userRouter.get('/', getAllUsers);
userRouter.get('/:id', getUniqueUser);
userRouter.delete('/:id', deleteUser);
userRouter.put('/:id', [userUpdateValidation, updateUser]);

module.exports = userRouter;
