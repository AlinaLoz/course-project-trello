const saveToHistory = async (instance, options, actionId) => {
    const { id: userId } = options;
    const { id: boardId } = instance;
    global.appServises.historyEmmitter.eventEmitter.emit('user-history', {userId, boardId, actionId});
};

exports.Board = (sequelize, type) => {
    const Board = sequelize.define('board', {
        id : {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: type.TEXT,
            allowNull: false
        },
        ownerIsTeam: {
            type: type.BOOLEAN,
            allowNull: false,
        }
    },{
      hooks: {
          afterSave: (instance, options) => saveToHistory(instance, options, 0),
          afterUpdate: (instance, options) => saveToHistory(instance, options, 2),
      }
    });
    return Board;
};