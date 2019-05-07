exports.Action = (sequelize, type) => {
  const Action = sequelize.define('actions', {
    id : {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    actionId: {
      type: type.INTEGER,
    },
    userId: {
      type: type.INTEGER,
    },
    boardId: {
      type: type.INTEGER,
    },
  },{
    indexes:[
      {
        unique: false,
        fields:['actionId', 'userId', 'boardId']
      }
    ]

  });

  return Action;
};