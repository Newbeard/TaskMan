const socket = io();
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
