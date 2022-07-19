import { Router } from 'express';
import { handleCreateCustomer } from '../controller/customer.controller';

const customerRouter = Router();

customerRouter.route('/').post(handleCreateCustomer);

export default customerRouter;
