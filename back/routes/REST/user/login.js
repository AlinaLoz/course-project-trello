const {User} = require('../../../lib/sequelize');
const {ConfirmPasswordError, InteractionDBError, UserNotExistError} = require("../../../models/mysql/user");

exports.get = async function (req, resp) {
  try {
    const {login, password} = req.query;
    const user = await User.login(login, password);
    resp.status(200).send(user);
  } catch (err) {
    if (err instanceof UserNotExistError) {
      resp.status(400).send({data: {status: "error", message: err.message}});
    }
    if (err instanceof ConfirmPasswordError) {
      resp.status(400).send({data: {status: "error", message: err.message}});
    }

    if (err instanceof InteractionDBError) {
      resp.status(500).send("There was a problem registering the user");
    }
  }
};