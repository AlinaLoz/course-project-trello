const {User} = require('../../../lib/sequelize');
const GLOBAL = require('../../../constans/global');

exports.getAllUsers = async (req, resp) => {
  try {
    const {id} = req;
    const {numberPage} = req.params;
    const user = await User.findByPk(parseInt(id));
    if (user.role !== 'admin') resp.send(202, {messages: 'user is not admin'});

    const users = await User.findAndCount({
      where: {
        role: 'user'
      },
      limit: GLOBAL.LIMIT_RECORD_ON_PAGE,
      offset: GLOBAL.LIMIT_RECORD_ON_PAGE * numberPage,
      order: [
        ['createdAt', 'DESC']
      ]
    });
    resp.send(200, {users: users.rows, countRecord: users.count});
  } catch (err) {
    console.log(err);
    return resp.status(500).end({messages: err.message});
  }
};

exports.deleteUser = async (req, resp) => {
  try {
    const {id} = req;
    const {pageNumber, id: idDeleteUser} = req.body;
    const user = await User.findByPk(parseInt(id));
    if (user.role !== 'admin') return resp.send(404, {messages: 'user is not admin'});
    const deleteUser = await User.findByPk(parseInt(idDeleteUser));
    if (!deleteUser) return resp.send(404, {messages: 'user is not exist'});

    await deleteUser.destroy();
    const users = await User.findAndCount({
      where: {
        role: 'user'
      },
      limit: GLOBAL.LIMIT_RECORD_ON_PAGE,
      offset: GLOBAL.LIMIT_RECORD_ON_PAGE * pageNumber,
      order: [
        ['createdAt', 'DESC']
      ]
    });
    resp.send(200, {users: users.rows, countRecord: users.count});
  } catch (err) {
    console.log(err);
    return resp.status(500).end({messages: err.message});
  }
};