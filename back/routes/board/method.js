const {User, Team, Board} = require('../../lib/sequelize');

exports.getBoards = async function (req, resp) {
    try {
        const user = await User.findByPk(parseInt(req.id));
        if (!user) throw new Error('user is not exist');
        let boards = await user.getBoards();
        const teams = await user.getTeams();
        for await (const team of teams) {
            const tboards = await team.getBoards();
            boards = [...boards, ...tboards];
        }
        resp.send(200, {boards})
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
        return resp.status(500).end({messages: err});
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
    const {id} =  req;
    const {isTeamBoard = false, name, team = null} = req.body;
    console.log(id, isTeamBoard, name, team);
    if (isTeamBoard) {
        try {
            const searchTeam = await Team.findById(parseInt(team));
            if (!searchTeam) throw new Error('team is not exist');
            const board = await searchTeam.createBoard({name, ownerIsTeam: isTeamBoard, userId: null, teamId: team})
            resp.send({board});
        } catch (err) {
            console.log(err);
            return resp.status(500).end({messages: err});
        }
    } else {
        try {
            const user = await User.findById(parseInt(id));
            if (!user) throw new Error('team is not exist');
            const board = await user.getBoards().filter(board => board.name === name && !board.ownerIsTeam);
            if (board.length) throw new Error('board with the same name is exist');
            const newBoard = await user.createBoard({name, ownerIsTeam: isTeamBoard, userId: id, teamId: null});
            const {updatedAt, createdAt, ...other} = newBoard.dataValues;
            resp.send({board: other});
        } catch(err) {
            console.log(err);
            return resp.status(500).end({messages: err});
        }
    }
};

exports.delete = async (req, resp) => {
    try {
        const { id } = req.body;
        const board = await Board.findById(parseInt(id));
        if (!board) throw new Error('board is not exist');
        await board.destroy();
        resp.send({message: 'board has been destoyed', id});
    } catch(err) {
        console.log(err);
        return resp.status(500).end({messages: err});
    }
};