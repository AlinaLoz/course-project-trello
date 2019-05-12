const {User} = require('../../../lib/sequelize');

exports.get = async function (req, resp) {
    const {id} = req;
    const user = await User.findByPk(parseInt(id));
    const {name, login, role} = user;
    resp.send(200, {auth: true, token: req.token, id: req.id, name, login, role});
};