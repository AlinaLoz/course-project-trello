const Sequelize = require('sequelize');
const conf = require('../config/db');
const ACTIONS = require('../constans/user_action');
const TypeActionModel = require('../models/mysql/type_action');
const ActionModel = require('../models/mysql/action').Action;
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

const TypeAction = TypeActionModel(sequelize, Sequelize);
const Action = ActionModel(sequelize, Sequelize);
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
	.then(async () => {
		console.log(`Database & tables created!`);

		const listAction = ACTIONS.map(action => TypeAction.build({number: action.number, name: action.name}));
		const createAction = Promise.all(listAction)
			.then(async results => {
				try {
					for (const item of results) {
						await item.save();
					}
				} catch (err) {
					console.log(err);
				}
			});
	});

module.exports = {
	TypeAction,
	Action,
	User,
	Team,
	Board,
	List,
	Task
};

