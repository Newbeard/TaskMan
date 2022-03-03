function webSocet(io, sessionParser) {
  io.on('connection', (socket) => {
    const { request } = socket;

    sessionParser(request, {}, () => {
      socket.broadcast.emit('greetings', { user: request.session.user.name });
    });

    socket.on('chat:outgoing', (payload) => {
      console.log('chat:outgoing', payload);
      const { text } = payload;
      // insert into db

      io.emit('chat:incoming', { text, user: request.session.user.name });
    });
  });
}

module.exports = { webSocet };
