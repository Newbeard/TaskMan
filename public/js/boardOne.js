// const io = require('../../app');

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
  socket.on('sendNewTask', (payload) => {
    const {
      newTask,
    } = payload;
    //  console.log(newTask);
    // console.log(placeholders);
    // console.log(placeholders[0].dataset.statustask);
    for (let i = 0; i < placeholders.length; i += 1) {
      console.log(placeholders[i].dataset.statustask, newTask.statusdId);
      // console.log(placeholders[0]);
      if (placeholders[i].dataset.statustask == newTask.statusdId) {
        console.log('sucsses');
        placeholders[i].insertAdjacentHTML('beforeend', `<div class="item" data-idTask="${newTask.id}" data-status="${newTask.statusdId} "draggable="true">${newTask.title}</div>`);
      }
    }
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

socket.on('sendTask', (payload) => {
  const {
    tasks,
  } = payload;
  startplaceholders.insertAdjacentHTML('beforeend', `<div class="item" data-idTask="${tasks.id}" data-status="${tasks.statusdId}" draggable="true">${tasks.title}</div>`);
  const newItems = startplaceholders.children;
  newItems[newItems.length - 1].addEventListener('dragstart', dragstart);
  newItems[newItems.length - 1].addEventListener('dragend', dragend);
});
