module.exports = function (app) {
  require('./user')(app);
  require('./team')(app);
  require('./board')(app);
  require('./list')(app);
  require('./task')(app);
};