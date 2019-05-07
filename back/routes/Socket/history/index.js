const { Action, User, TypeAction, Board } = require('../../../lib/sequelize');

module.exports = async (io, data, action) => {
  const {id} = data;
  try {
    const user = await User.findByPk(parseInt(id));

    if (!user) io.emit(action, {errors: 'user is not exist'});

    let boards = await user.getBoards();
    const teams = await user.getTeams();


    for await (const team of teams) {
      const tboards = await team.getBoards();
      boards = [...boards, ...tboards];
    }

    let history = [];

    for await (const board of boards) {
      console.log(board.id);
      const tmp = await Action.findAll({where: {boardId: board.id}});
      history = [...history, ...tmp];
    }

    let result = [];

    console.log(history.length);

    for (const item of history) {
      const action = await TypeAction.findAll({where: {number : parseInt(item.actionId)}});
      const board = await Board.findByPk(parseInt(item.boardId));
      const user = await User.findByPk(parseInt(item.userId));

      result.push({
        action : {id: action[0].number, name: action[0].name},
        board: {id: board.id, name: board.name},
        user : {id: user.id, login: user.login},
        time : item.createdAt
      })
    }
    io.emit(action, {history: result});

  }catch(err) {
    io.emit(action, {errors: err.message});
  }
};

