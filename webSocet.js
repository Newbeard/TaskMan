const { Task } = require('./db/models');

function webSocet(io, sessionParser) {
  io.on('connection', (socket) => {
    socket.on('addTask', async (payload) => {
      const { task, boardId } = payload;
      const tasks = await Task.create({ title: task, boardId, statusdId: 1 });
      io.emit('sendTask', { tasks });
    });
    socket.on('addNewTask', async (payload) => {
      const { task, id } = payload;
      console.log(task, id);
      await Task.update({
        statusdId: task,
      }, {
        where: {
          id,
        },
      });
      const newTask = await Task.findOne({
        where: { id },
        raw: true,
      });
      socket.broadcast.emit('sendNewTask', { newTask, task, id });
    });
    socket.on('deleteTask', async (payload) => {
      const { deleteId } = payload;
      console.log(deleteId);
      await Task.destroy({
        where: { id: deleteId },
      });
      io.emit('enterDeleteTask', { deleteId });
    });
  });
}

module.exports = { webSocet };
