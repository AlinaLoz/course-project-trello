const { Board, List } = require('../../../lib/sequelize');

exports.getLists = async function (req, resp) {
  try {
    const {id} = req.query;
    const board = await Board.findByPk(parseInt(id));
    if (!board) throw new Error('board is not exist');
    let lists = await board.getLists();
    resp.send(200, {lists})
  }catch(err) {
    console.log(err);
    return resp.status(500).end({messages: err.message});
  }
};

exports.createList = async (req, resp) => {
  try {
    const {idBoard, nameList} = req.body;

    if (!idBoard) throw new Error('idBoard is require');
    if (!nameList) throw new Error('nameList is require');

    const board = await Board.findByPk(parseInt(idBoard));
    if (!board) throw new Error('board is not exist');
    let lists = await board.getLists();
    const list =  lists.find(l => l.name === nameList);
    if (list) throw new Error('list with the same name is exist');
    await board.createList({name: nameList}, {idBoard, idUser: req.id});
    lists = await board.getLists();
    resp.send(200, {lists})
  }catch(err) {
    console.log(err);
    return resp.status(500).send({messages: err.message});
  }
};

exports.delete = async (req, resp) => {
  try {
    const {id} = req.body;
    if (!id) throw new Error('idList is require');
    const list = await List.findByPk(parseInt(id));
    if (!list) throw new Error('list is not exist');
    const board = await list.getBoard();
    await list.destroy({idUser: req.id, idBoard: board.id});
    resp.send(200, {boardId: board.id, listId: id})
  }catch(err) {
    console.log(err);
    resp.status(404).send({message: err.message});
  }
};


