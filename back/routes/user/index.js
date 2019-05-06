module.exports = function (app) {
  app.get('/api/v1.0/login', require('./login').get);
  app.post('/api/v1.0/register', require('./register').post);

  app.use(require('../../middleware/tokenChecker'));

  app.get('/api/v1.0/auth', require('./auth').get);
  app.get('/api/v1.0/logout', require('./logout').get);
  app.get('/api/v1.0/user/check', require('./user').get);
};