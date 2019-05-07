const {User} = require('../../../lib/sequelize');

exports.get = async function (req, resp) {
  try {
    const {login} = req.query;
    const user = await User.findOne({where: {login}});
    if (user) {
      resp.status(200).send({id: user.id, login: user.login});
    } else {
      resp.status(404).send({message: "user is not exist"});
    }
  } catch (err) {
    resp.status(500).send({message: err});
  }
};

exports.getHistory = async function (req, resp) {
  try {
    const {id} = req.query;

  }
  catch(err) {
    resp.status(500).send({message: err});
  }
};
