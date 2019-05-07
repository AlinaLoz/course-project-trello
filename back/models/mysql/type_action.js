module.exports = (sequelize, type) => {
  return sequelize.define('type_action', {
    id : {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: type.TEXT,
      allowNull: false
    },
    number:{
      type: type.TEXT,
      allowNull: false
    }
  });
};
