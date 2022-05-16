const userRouter = require('./user');
const categoryRouter = require('./category');
const offerRouter = require('./offer')

const setupRoutes = (app) => {
  app.use('/api/users', userRouter);
  app.use('/api/categories', categoryRouter);
  app.use('/api/offers', offerRouter)
};

module.exports = setupRoutes;
