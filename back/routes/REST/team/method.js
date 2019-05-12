const {User, Team} = require('../../../lib/sequelize');
const GLOBAL = require('../../../constans/global');

exports.get = async function (req, resp) {
  try {
    const {numberPage} = req.params;
    const user = await User.findByPk(parseInt(req.id));
    const teams = await user.getTeams({
      where: {},
      order: [
        ['createdAt', 'DESC']
      ]
    });
    const formatTeams = teams
      .map(({ id, name }) => ({id, name}))
      .splice(GLOBAL.LIMIT_RECORD_ON_PAGE * numberPage, GLOBAL.LIMIT_RECORD_ON_PAGE);
    resp.status(200).send({teams: formatTeams, countRecord: teams.length});
  } catch (err) {
    console.log(err);
    return resp.status(500).end({messages: err});
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
    return resp.status(500).end({messages: err});
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
    const {id: idTeam, numberPage} = req.body;
    const team = await Team.findByPk(idTeam);
    if (!team) resp.status(400).send({message: "this team is not exist"});
    await team.destroy();

    const user = await User.findByPk(parseInt(req.id));

    const teams = await user.getTeams({
      where: {},
      limit: GLOBAL.LIMIT_RECORD_ON_PAGE,
      offset: GLOBAL.LIMIT_RECORD_ON_PAGE * numberPage,
      order: [
        ['createdAt', 'DESC']
      ]
    });
    resp.status(200).send({teams, message: "team has been droped"});
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