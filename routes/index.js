import userRouter from './user.router.js';
import packRouter from './pack.router.js';

import answerRouter from './option.router.js';
import customerRouter from './customer.router.js';
import fileRouter from './file.router.js';

const setupRoutes = (app) => {
  app.use('/api/users', userRouter);
  app.use('/api/packs', packRouter);
  app.use('/api/options', answerRouter);
  app.use('/api/customers', customerRouter);
  app.use('/api/files', fileRouter);
};

export default setupRoutes;
