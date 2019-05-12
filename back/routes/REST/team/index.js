module.exports = function (app) {
  app.get('/api/v1.0/teams/:numberPage', require('./method').get);
  app.get('/api/v1.0/team/:id', require('./method').getById);
  app.post('/api/v1.0/team/add', require('./method').teamAdd);
  app.delete('/api/v1.0/team/drop', require('./method').delete);
  app.put('/api/v1.0/team/update', require('./method').put);
};