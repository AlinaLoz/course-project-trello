module.exports = (io) => {
  io.use(require('../../middleware/tokenChecker').socket);

  io.on('user-history-all', (data) => require('./history')(io, data, 'user-history'));
  io.on('user-history', (data) => io.emit('user-history', data));
};