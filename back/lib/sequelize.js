const Sequelize = require('sequelize');
const conf = require('../config/db');
const UserModel = require('../models/mysql/user').User;
const TeamModel = require('../models/mysql/team');
const BoardModel = require('../models/mysql/board').Board;
const ListModel = require('../models/mysql/list');
const TaskModel = require('../models/mysql/task');

const sequelize = new Sequelize(conf.database, conf.user, conf.password, {
	host: "127.0.0.1",
	dialect: conf.dialect,
 	port: "3306",
	pool: {
		max: conf.pool.max
	}
});

const User = UserModel(sequelize, Sequelize);
const Team = TeamModel(sequelize, Sequelize);
const Board = BoardModel(sequelize, Sequelize);
const List = ListModel(sequelize, Sequelize);
const Task = TaskModel(sequelize, Sequelize);

User.belongsToMany(Team, {through: 'userteam' });
Team.belongsToMany(User, {through: 'userteam' });

User.hasMany(Board);
Team.hasMany(Board);
Board.belongsTo(User);
Board.belongsTo(Team);

List.belongsTo(Board);
Board.hasMany(List);

List.hasMany(Task);
Task.belongsTo(List);

sequelize.sync()
	.then(() => {
		console.log(`Database & tables created!`)
});

module.exports = {
	User,
	Team,
	Board,
	List
};

