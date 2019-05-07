const saveToHistory = async (instance, options, actionId) => {
	const { idBoard: boardId, idUser: userId } = options;
	console.log(userId, boardId);
	global.appServises.historyEmmitter.eventEmitter.emit('user-history', {userId, boardId, actionId});
};

module.exports = (sequelize, type) => {
	return sequelize.define('task', {
		id : {
			type: type.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		text: type.TEXT,
		theme: type.TEXT
	},{
		hooks: {
				afterSave: (instance, options) => saveToHistory(instance, options, 6),
				afterUpdate: (instance, options) => saveToHistory(instance, options, 8),
	}
	});
};