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
    // const taskDelete = document.querySelector(`.item[data-idtask="${id}"&data-status="${task}"]`);
    // console.log(5555);
    // console.log(taskDelete);
    // for (let i = 0; i < items.length; i += 1) {
    //   for (let j = 0; j < items.length; j += 1) {
    //     if (items[i].dataset.idtask == id && items[j].dataset.status == task) {
    //       items[i].remove();
    //       console.log(items[i]);
    //     }
    //   }
    // }
    // console.log(item);
    for (let i = 0; i < placeholders.length; i += 1) {
      if (placeholders[i].dataset.statustask == newTask.statusdId) {
        placeholders[i].insertAdjacentHTML('beforeend', `<div class="item" data-idtask="${newTask.id}" data-status="${newTask.statusdId} "draggable="true"><div>${newTask.title}}</div><button  class="btn-delete" type="button" data-iddelete="{{this.id}}">удалить</button></div></div>`);
        event.target.reset();
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
  startplaceholders.insertAdjacentHTML('beforeend', `<div class="item" data-idtask="${tasks.id}" data-status="${tasks.statusdId}" draggable="true"><div>${tasks.title}}</div><button  class="btn-delete" type="button" data-iddelete="{{this.id}}">удалить</button></div>`);
  const newItems = startplaceholders.children;
  newItems[newItems.length - 1].addEventListener('dragstart', dragstart);
  newItems[newItems.length - 1].addEventListener('dragend', dragend);
});

const deleteTaskBtns = document.querySelector('.row1');
deleteTaskBtns.addEventListener('click', (event) => {
  const deleteId = event.target.dataset.iddelete;
  if (deleteId) {
    socket.emit('deleteTask', {
      deleteId,
    });
  }
  socket.on('enterDeleteTask', (payload) => {
    const {
      deleteId,
    } = payload;
    console.log(deleteId);
  });
});
