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
} from '../middlewares/validation/user.validation';

const userRouter = Router();

userRouter.route('/').post([userCreationValidation, createUser]).get(getAllUsers);

userRouter.route('/login').post([userLoginValidation, loginUser]);

userRouter
  .route('/:id')
  .get(getUniqueUser)
  .delete(deleteUser)
  .put([userUpdateValidation, updateUser]);

export default userRouter;
