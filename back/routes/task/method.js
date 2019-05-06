const {List, Task} = require('../../lib/sequelize');

exports.getTasksById = async (req, resp) => {
    try {
        const {idList} = req.query;
        const list = await List.findByPk(parseInt(idList));
        if (!list) throw new Error('list is not exist');
        let tasks = await list.getTasks();
        resp.send(200, {tasks})
    } catch (err) {
        console.log(err);
        return resp.status(500).end({messages: err.message});
    }
};

exports.createTask = async (req, resp) => {
    try {
        const {text, theme, idList} = req.body;

        const list = await List.findByPk(parseInt(idList));
        if (!list) throw new Error('list is not exist');
        await list.createTask({text, theme});
        const tasks = await list.getTasks();
        resp.send(200, {tasks});
    } catch(err) {
        console.log(err);
        return resp.status(500).end({messages: err.message});
    }
};

exports.changeTask = async (req, resp) => {
    try {
        const {text, theme} = req.body;
        const task = await Task.findByPk(parseInt(req.params.id));
        if (!task) throw new Error('task is not exist');
        const updateTask = await task.update({text, theme});
        const listTemp = await updateTask.getList();
        const list = await List.findByPk(listTemp.id);
        const tasks = await list.getTasks();
        resp.send(200, {changeTasks: tasks, listId: listTemp.id});
    } catch(err) {
        console.log(err);
        return resp.status(500).end({messages: err.message});
    }
};

exports.delete = async (req, resp) => {
    try {
        const task = await Task.findById(parseInt(req.params.id));
        if (!task) throw new Error('task is not exist');
        const list = await task.getList();
        await task.destroy();
        const changeList = await List.findById(list.id);
        const changeTasks = await changeList.getTasks();
        resp.send({changeTasks, listId: list.id });
    } catch(err) {
        console.log(err);
        return resp.status(500).end({messages: err.message});
    }
};
