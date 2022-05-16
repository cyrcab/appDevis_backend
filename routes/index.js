const userRouter = require('./user');
const categoryRouter = require('./category');

const setupRoutes = (app) => {
  app.use('/api/users', userRouter);
  app.use('/api/categories', categoryRouter);
};

module.exports = setupRoutes;
