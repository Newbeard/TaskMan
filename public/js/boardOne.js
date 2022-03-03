const socket = io();
const item = document.querySelector('.item');
const placeholders = document.querySelectorAll('.placeholder');

for (const placeholder of placeholders) {
  placeholder.addEventListener('dragover', dragover);
  placeholder.addEventListener('dragenter', dragenter);
  placeholder.addEventListener('dragleave', dragleave);
  placeholder.addEventListener('drop', dragdrop);
}

item.addEventListener('dragstart', dragstart);
item.addEventListener('dragend', dragend);

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
  event.target.classList.remove('hovered');
  event.target.append(item);
}

const { chatForm } = document.forms;
const chatBlock = document.getElementById('chat');

chatForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const {
    text: {
      value: text,
    },
  } = event.target;

  socket.emit('chat:outgoing', { text });

  event.target.reset();
});

socket.on('connect', () => {
  console.log('Hi from connect');

  socket.on('greetings', (payload) => {
    chatBlock.insertAdjacentHTML('beforeend', `<p style="text-align: center;"><b>${payload.user}</b> is joined the chat</p>`);
  });

  socket.on('chat:incoming', (payload) => {
    const { text, user } = payload;
    chatBlock.insertAdjacentHTML('beforeend', `<p><b>${user}:</b> ${text}</p>`);
  });
});
