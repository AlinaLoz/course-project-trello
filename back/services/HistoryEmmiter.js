const events = require('events');
const { Action, User, TypeAction, Board  } = require('../lib/sequelize');

class HistoryEmmiter {
  constructor() {
    this.eventEmitter = new events.EventEmitter();

    this.eventEmitter.on('user-history', ({userId, boardId, actionId}) => {
      try {
        const promise = Promise.all([Action.build({userId, boardId, actionId})]);
        promise.then(result => {
          result[0].save();
          Object.entries(global.socketMap).forEach(async ([key, sockets]) => {
            const action = await TypeAction.findAll({where: {number: parseInt(result[0].actionId)}});
            const board = await Board.findByPk(parseInt(result[0].boardId));
            const user = await User.findByPk(parseInt(result[0].userId));

            const resultChange = {
              action : {id: action[0].number, name: action[0].name},
              board: {id: board.id, name: board.name},
              user : {id: user.id, login: user.login},
              time : result[0].createdAt
            };

            sockets.forEach(socket => socket.emit('user-history-one', {history:resultChange}));
          });
        });

      }catch(err) {
        console.log(err);
      }
    });
  }
}

module.exports = HistoryEmmiter;