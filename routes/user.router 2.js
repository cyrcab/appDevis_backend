import { Router } from 'express';
import {
  createUser,
  getAllUsers,
  getUniqueUser,
  deleteUser,
  updateUser,
  loginUser,
} from '../controller/user.controller';
import {
  userCreationValidation,
  userUpdateValidation,
  userLoginValidation,
} from '../middlewares/validation/user';

const userRouter = Router();

userRouter
  .post('/', [userCreationValidation, createUser])
  .get('/', getAllUsers)
  .post('/login', [userLoginValidation, loginUser]);

userRouter
  .get('/:id', getUniqueUser)
  .delete('/:id', deleteUser)
  .put('/:id', [userUpdateValidation, updateUser]);

export default userRouter;
