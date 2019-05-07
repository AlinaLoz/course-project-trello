module.exports = function (app) {
  app.get('/api/v1.0/list', require('./method').getLists);
  app.post('/api/v1.0/list/add', require('./method').createList);
  app.delete('/api/v1.0/list/delete', require('./method').delete);
};