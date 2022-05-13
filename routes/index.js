const testRoute = require('./testRoutes');
const userRouter = require('./user');

const setupRoutes = (app) => {
  app.use('/api', testRoute);
  app.use('/api/users', userRouter);
};

module.exports = setupRoutes;
