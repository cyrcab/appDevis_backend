const userRouter = require('./user');
const categoryRouter = require('./category');
const questionRouter = require('./question.js');
const answerRouter = require('./answer');


const setupRoutes = (app) => {
  app.use('/api/users', userRouter);
  app.use('/api/categories', categoryRouter);
  app.use('/api/questions', questionRouter);
  app.use('/api/answers', answerRouter);
};

module.exports = setupRoutes;
