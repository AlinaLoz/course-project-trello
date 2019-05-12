module.exports = function (app) {
  app.get('/api/v1.0/board/:id', require('./method').getBoardById);
  app.get('/api/v1.0/boards/:numberPage', require('./method').getBoards);
  app.get('/api/v1.0/boards-by-team', require('./method').getBoardsByTeam);
  app.post('/api/v1.0/board/add', require('./method').createBoard);
  app.delete('/api/v1.0/board/drop', require('./method').delete);
};