import userRouter from './user.router';
import packRouter from './pack.router';
// import questionRouter from './question.js';
import answerRouter from './option.router';
// import customerRouter from './customer';
// import estimateRouter from './estimate';

const setupRoutes = (app) => {
  app.use('/api/users', userRouter);
  app.use('/api/packs', packRouter);
  // app.use('/api/questions', questionRouter);
  app.use('/api/options', answerRouter);
  // app.use('/api/customer', customerRouter);
  // app.use('/api/estimates', estimateRouter);
};

export default setupRoutes;
