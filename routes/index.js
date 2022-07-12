import checkUserRole from '../middlewares/checkUserRole';
import userRouter from './user.router';
import packRouter from './pack.router';

import answerRouter from './option.router';
// import customerRouter from './customer';
// import estimateRouter from './estimate';

const setupRoutes = (app) => {
  // app.use('/signup', signup);
  // app.post('/signin', signin);
  app.use('/api/users', userRouter);
  app.use('/api/packs', [checkUserRole, packRouter]);
  // app.use('/api/questions', questionRouter);
  app.use('/api/options', [checkUserRole, answerRouter]);
  // app.use('/api/customer', customerRouter);
  // app.use('/api/estimates', estimateRouter);
};

export default setupRoutes;
