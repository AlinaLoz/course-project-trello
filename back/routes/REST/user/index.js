module.exports = function (app) {
  app.get('/api/v1.0/login', require('./login').get);
  app.post('/api/v1.0/register', require('./register').post);

  app.use(require('../../../middleware/tokenChecker').restAPI);

  app.get('/api/v1.0/get-all-users/:numberPage', require('./admin').getAllUsers);
  app.delete('/api/v1.0/delete-user', require('./admin').deleteUser);

  app.get('/api/v1.0/auth', require('./auth').get);
  app.get('/api/v1.0/logout', require('./logout').get);
  app.get('/api/v1.0/user/check', require('./user').get);
  app.get('/api/v1.0/user-History', require('./user').getHistory);
};