module.exports = function (app) {
  app.get('/api/v1.0/tasks', require('./method').getTasksById);
  app.put('/api/v1.0/task-change/:id', require('./method').changeTask);
  app.post('/api/v1.0/task/add', require('./method').createTask);
  app.delete('/api/v1.0/task-delete/:id', require('./method').delete);
};