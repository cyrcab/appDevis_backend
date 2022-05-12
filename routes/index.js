const testRoute = require('./testRoutes')


const setupRoutes = (app) => {
  app.use('/', testRoute);
};

module.exports = setupRoutes;
