const saveToHistory = async (instance, options, actionId) => {
    const { idBoard: boardId, idUser:userId } = options;
    global.appServises.historyEmmitter.eventEmitter.emit('user-history', {userId, boardId, actionId});
};

module.exports = (sequelize, type) => {
    return sequelize.define('list', {
        id : {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: type.TEXT,
            allowNull: false
        },
    },{
      hooks: {
          afterSave: (instance, options) => saveToHistory(instance, options, 3),
          afterUpdate: (instance, options) => saveToHistory(instance, options, 5),
      }
    });
};