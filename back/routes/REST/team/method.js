const {User, Team} = require('../../../lib/sequelize');

exports.get = async function (req, resp) {
  try {
    const user = await User.findByPk(parseInt(req.id));
    const teams = await user.getTeams();
    resp.status(200).send(teams.map(({ id, name }) => ({id, name})))
  } catch (err) {
    console.log(err);
    resp.status(401).end();
  }
};

exports.getById = async function (req, resp) {
  try {
    const team = await Team.findByPk(parseInt(req.params.id));
    const users = await User.findAll({
      include: [{
        model: Team,
        where: {id: req.params.id}
      }]
    }).map(user => ({id: user.id, login: user.login}));
    const boards = await team.getBoards();
    resp.send(200, {team: {name: team.name, id: team.id, users, boards}});

  } catch (err) {
    console.log(err);
    resp.status(500).end();
  }
};


exports.teamAdd = async function(req, resp) {
  try {
    const {name, users} = req.body;
    const user = await User.findByPk(parseInt(req.id));
    const team = await Team.findOne({where: {name}});
    if (team) return resp.status(400).send({message: "this team exist"});
    const newTeam = await Team.create({name});
    users.forEach(id => User.findByPk(id).then(user => user.addTeam(newTeam)));
    await user.addTeam(newTeam);
    resp.status(201).send({message: "team is created"})
 } catch(err) {
    console.log(err);
    return resp.status(500).end({messages: err});
  }
};

exports.delete = async function (req, resp) {
  try {
    const {id} = req.body;
    const team = await Team.findByPk(id);
    if (!team) resp.status(400).send({message: "this team is not exist"});
    await team.destroy();
    resp.status(200).send({id, message: "team has been droped"});
  } catch (err) {
    console.log(err);
    return resp.status(401).end({messages: err});
  }
};

exports.put = async function (req, resp) {
  try {
    const {id, name} = req.body;
    const team = await Team.findByPk(parseInt(id));
    if (!team) resp.status(400).send({message: "this team is not exist"});
    await team.update({name: name});
    resp.send(200, {message: "изменения сохранены"})
  } catch (err) {
    console.log(err);
    return resp.status(500).end({messages: err});
  }
};