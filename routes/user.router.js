import { Router } from 'express';
import {
  createUser,
  getAllUsers,
  getUniqueUser,
  deleteUser,
  updateUser,
} from '../controller/user.controller.js';
import {
  userCreationValidation,
  userUpdateValidation,
} from '../middlewares/validation/user.validation.js';

const userRouter = Router();

userRouter.route('/').post([userCreationValidation, createUser]).get(getAllUsers);

userRouter
  .route('/:id')
  .get(getUniqueUser)
  .delete(deleteUser)
  .put([userUpdateValidation, updateUser]);

export default userRouter;
