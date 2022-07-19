import userRouter from './user.router';
import packRouter from './pack.router';

import answerRouter from './option.router';
import customerRouter from './customer.router';
import fileRouter from './file.router';

const setupRoutes = (app) => {
  app.use('/api/users', userRouter);
  app.use('/api/packs', packRouter);
  app.use('/api/options', answerRouter);
  app.use('/api/customer', customerRouter);
  app.use('/api/files', fileRouter);
};

export default setupRoutes;
