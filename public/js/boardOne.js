const socket = io();
const items = document.querySelectorAll('.item');
const placeholders = document.querySelectorAll('.placeholder');

for (let i = 0; i < placeholders.length; i += 1) {
  placeholders[i].addEventListener('dragover', dragover);
  placeholders[i].addEventListener('dragenter', dragenter);
  placeholders[i].addEventListener('dragleave', dragleave);
  placeholders[i].addEventListener('drop', dragdrop);
}

for (let i = 0; i < items.length; i += 1) {
  items[i].addEventListener('dragstart', dragstart);
  items[i].addEventListener('dragend', dragend);
}

function dragstart(event) {
  event.target.classList.add('hold');
  setTimeout(() => event.target.classList.add('hide'), 0);
}

function dragend(event) {
  event.target.classList.remove('hold');
  event.target.classList.remove('hide');
}

function dragover(event) {
  event.preventDefault();
}

function dragenter(event) {
  event.target.classList.add('hovered');
}

function dragleave(event) {
  event.target.classList.remove('hovered');
}

function dragdrop(event) {
  const item = document.querySelector('.hold');
  event.target.classList.remove('hovered');
  event.target.append(item);

  const task = event.target.dataset.statustask;
  const id = item.dataset.idtask;
  console.log(task, id);
  socket.emit('addNewTask', {
    task,
    id,
  });
}

const {
  formtask,
} = document.forms;
const startplaceholders = document.getElementById('startPlaceholder');

formtask.addEventListener('submit', (event) => {
  event.preventDefault();
  const boardId = event.target.dataset.idboard;
  const {
    task: {
      value: task,
    },
  } = event.target;
  socket.emit('addTask', {
    task,
    boardId,
  });
  event.target.reset();
});

const deleteTaskBtns = document.querySelector('.row1');
deleteTaskBtns.addEventListener('click', (event) => {
  const deleteId = event.target.dataset.iddelete;
  // const deleteTask = document.querySelector(`.item[data-idtask='${deleteId}']`);
  socket.emit('deleteTask', {
    deleteId,
  });
});
socket.on('connect', () => {
  socket.on('sendNewTask', (payload) => {
    const {
      newTask,
      task,
      id,
    } = payload;
    console.log(task, id);
    const deleteTask = document.querySelector(`.item[data-idtask='${id}']`);
    deleteTask.remove();
    for (let i = 0; i < placeholders.length; i += 1) {
      if (placeholders[i].dataset.statustask == newTask.statusdId) {
        placeholders[i].insertAdjacentHTML('beforeend', `<div class="item" data-idtask="${newTask.id}" data-status="${newTask.statusdId} "draggable="true"><div>${newTask.title}</div><button  class="btn-delete" type="button" data-iddelete="${newTask.id}">❌</button></div></div>`);
      }
    }
  });
  socket.on('sendTask', (payload) => {
    const {
      tasks,
    } = payload;
    startplaceholders.insertAdjacentHTML('beforeend', `<div class="item" data-idtask="${tasks.id}" data-status="${tasks.statusdId}" draggable="true"><div>${tasks.title}</div><button  class="btn-delete" type="button" data-iddelete="${tasks.id}">❌</button></div>`);
    const newItems = startplaceholders.children;
    newItems[newItems.length - 1].addEventListener('dragstart', dragstart);
    newItems[newItems.length - 1].addEventListener('dragend', dragend);
  });
  socket.on('enterDeleteTask', (payload) => {
    const {
      deleteId,
    } = payload;
    const deleteTask = document.querySelector(`.item[data-idtask='${deleteId}']`);
    deleteTask.remove();
  });
});
