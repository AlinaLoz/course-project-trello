const { Action, User, TypeAction, Board } = require('../../../lib/sequelize');
const GLOBAL = require('../../../constans/global');

module.exports = async (io, data, action) => {
  const {id, numberPage} = data;
  try {
    const user = await User.findByPk(parseInt(id));

    if (!user) io.emit(action, {errors: 'user is not exist'});

    let boards = await user.getBoards();
    const teams = await user.getTeams();

    for await (const team of teams) {
      const tboards = await team.getBoards();
      boards = [...boards, ...tboards];
    }

    const arrIdsBoard = boards.map(b => b.id);

    const history =  await Action.findAndCountAll({
      where: {
        boardId: arrIdsBoard
      },
      limit: GLOBAL.LIMIT_RECORD_ON_PAGE,
      offset: GLOBAL.LIMIT_RECORD_ON_PAGE * numberPage,
      order: [
        ['createdAt', 'DESC']
      ]
    });

    let result = [];

    for (const item of history.rows) {
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
    io.emit(action, {history: result, countRecord: history.count});

  }catch(err) {
    io.emit(action, {errors: err.message});
  }
};

