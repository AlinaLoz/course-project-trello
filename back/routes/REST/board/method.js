const {User, Team, Board} = require('../../../lib/sequelize');
const _ = require('lodash');
const GLOBAL = require('../../../constans/global');

exports.getBoards = async function (req, resp) {
    try {
        const {numberPage} = req.params;
        const user = await User.findByPk(parseInt(req.id));
        if (!user) throw new Error('user is not exist');
        let boards = await user.getBoards();
        const teams = await user.getTeams();

        for await (const team of teams) {
            const tboards = await team.getBoards();
            boards = [...boards, ...tboards];
        }
        const sortBoards = _.sortBy(boards, () => boards.createdAt).reverse();
        const spliceArray = sortBoards.splice(numberPage * GLOBAL.LIMIT_RECORD_ON_PAGE, GLOBAL.LIMIT_RECORD_ON_PAGE);
        resp.send(200, {boards: spliceArray, countRecord: boards.length})
    }catch(err) {
        console.log(err);
        return resp.status(500).end({messages: err});
    }
};

exports.getBoardById = async function (req, resp) {
    try {
        const board = await Board.findByPk(parseInt(req.params.id));
        if (!board) throw new Error('board is not exist');
        const lists = await board.getLists();
        const { id, name, ownerIsTeam, teamId, userId } = board;
        resp.send(200, {boards: [{id, name, ownerIsTeam, teamId, userId, lists}]})
    } catch(err) {
        console.log(err);
        return resp.status(500).end({messages: err.message});
    }
};

exports.getBoardsByTeam  = async function (req, resp) {
    try {
        const team = await Team.findByPk(parseInt(req.idTeam));
        if (!team) throw new Error('team is not exist');
        let boards = await team.getBoards();
        resp.send(200, {boards})
    }catch(err) {
        console.log(err);
        return resp.status(500).end({messages: err});
    }
};

exports.createBoard = async (req, resp) => {
    const {id} = req;
    const {isTeamBoard = false, name, team = null} = req.body;
    if (isTeamBoard) {
        try {
            const searchTeam = await Team.findById(parseInt(team));
            if (!searchTeam) throw new Error('team is not exist');
            const board = await searchTeam.createBoard({name, ownerIsTeam: isTeamBoard, userId: null, teamId: team}, {id});
            resp.send({board});
        } catch (err) {
            return resp.send(500, {messages: err.message});
        }
    } else {
        try {
            const user = await User.findById(parseInt(id));
            if (!user) throw new Error('team is not exist');
            const board = await user.getBoards().filter(board => board.name === name && !board.ownerIsTeam);
            if (board.length) throw new Error('board with the same name is exist');
            const newBoard = await user.createBoard({name, ownerIsTeam: isTeamBoard, userId: id, teamId: null}, {id});
            const {updatedAt, createdAt, ...other} = newBoard.dataValues;
            resp.send({board: other});
        } catch(err) {
            return resp.send(500, {messages: err.message});
        }
    }
};

exports.delete = async (req, resp) => {
    try {
        const { id, numberPage } = req.body;
        const board = await Board.findById(parseInt(id));
        if (!board) throw new Error('board is not exist');
        await board.destroy({id: req.id});

        const user = await User.findByPk(parseInt(req.id));
        let boards = await user.getBoards();
        const teams = await user.getTeams();

        for await (const team of teams) {
            const tboards = await team.getBoards();
            boards = [...boards, ...tboards];
        }

        const sortBoards = _.sortBy(boards, () => boards.createdAt).reverse();
        const spliceArray = sortBoards.splice(numberPage * GLOBAL.LIMIT_RECORD_ON_PAGE, GLOBAL.LIMIT_RECORD_ON_PAGE);
        resp.send({message: 'board has been destoyed', boards: spliceArray, countRecord: boards.length});
    } catch(err) {
        console.log(err);
        return resp.status(500).end({messages: err});
    }
};