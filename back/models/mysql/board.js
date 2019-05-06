const {User, Team} = require('../../lib/sequelize');

exports.Board = (sequelize, type) => {
    const Board = sequelize.define('board', {
        id : {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: type.TEXT,
            allowNull: false
        },
        ownerIsTeam: {
            type: type.BOOLEAN,
            allowNull: false,
        }
    });

    Board.create = async (id, isTeamBoard, name, team = null) => {
        if (isTeamBoard) {
            try {
                const searchTeam = await Team.findById(parseInt(team));
                if (!searchTeam) throw new Error('team is not exist');
                return await searchTeam.createBoard({name, ownerIsTeam: isTeamBoard, userId: null, teamId: team})
            } catch (err) {
                throw err;
            }
        } else {
            try {
                const user = await Team.findById(parseInt(id));
                if (!user) throw new Error('team is not exist');
                const board = await user.getBoards().filter(board => board.name === name && !board.ownerIsTeam);
                if (board.length) throw new Error('board with the same name is exist');
                const newBoard = await user.createBoard({name, ownerIsTeam: isTeamBoard, userId: id, teamId: null});
                const {updatedAt, createdAt, ...other} = newBoard.dataValues;
                return other;
            } catch (err) {
                throw err;
            }
        }
    };

    Board.delete = () => {};
    return Board;
};