const generateUsername = require('./functions/generateUsername');
const generateRoomCode = require('./functions/generateRoomCode');
const joinUserToRoom = require('./functions/joinUserToRoom');
const informRoomOfUserListUpdate = require('./functions/informRoomOfUserListUpdate');



module.exports = function attachSocketPaths(socket) {

  /* Generate username for user and load initial state */
  const username = generateUsername();
  socket.username = username;
  socket.emit('load initial state', socket.id, socket.username);


  socket.on('broadcast notification', (payload, roomCode) => {
    io.in(roomCode).emit('receive notification', payload);
  });


  socket.on('create game request', (fn) => {
    const roomCode = generateRoomCode();
    // fn(roomCode);
    const userRole = 'base';
    joinUserToRoom(socket.id, userRole, roomCode)
      // .then(() => informRoomOfUserListUpdate('user joined', socket.id, userRole, roomCode))
      .then(() => fn(roomCode));
  });


  socket.on('join room request', (roomCode, fn) => {
    roomCode = roomCode.toString();
    const room = io.sockets.adapter.rooms[roomCode];
    if (room) {
      switch (Object.keys(room.sockets).length) {
        case 1:
          const userRole = 'mobile';
          joinUserToRoom(socket.id, userRole, roomCode)
            .then(() => informRoomOfUserListUpdate('user joined', socket.id, userRole, roomCode))
            .then(() => fn('success', room.sockets));
          break;
        case 2:
          fn('room full');
          break;
        default:
          fn('unknown error');
          break;
      }
    } else {
      fn('room does not exist');
    }
  });


  socket.on('leave room request', (socketID, roomCode) => {

    const user = io.sockets.sockets[socketID];
    const userRole = io.sockets.adapter.sids[socketID][roomCode];

    // Leave user from room, then notify the remaining members in the room
    user.leave(roomCode, () => {
      informRoomOfUserListUpdate('user left', socketID, userRole, roomCode);
    });
  });


  socket.on('begin competition request', payload => {
    
    // Unpack arguments
    const {
      gameConfigObject,
      gameStateObject,
      roomCode
     } = payload;

    socket.to(roomCode)
      .emit('begin competition', { gameConfigObject, gameStateObject });
  });


  socket.on('update game request', (gameUpdateObject, roomCode) => {
    socket.to(roomCode).emit('update game', gameUpdateObject);
  });


  socket.on('add additional questions request', (result, roomCode) => {
    socket.to(roomCode).emit('add additional questions', result);
  });


  socket.on('reset game request', (gameConfigObject, roomCode) => {
    socket.to(roomCode).emit('reset game', gameConfigObject);
  });


  socket.on('end game request', roomCode => {
    socket.to(roomCode).emit('end game');
  });


  socket.on('disconnecting', function() {
    // For each room that the user was in, inform each of the members that the user has left
    const rooms = io.sockets.adapter.sids[socket.id]
    Object.entries(rooms).forEach(([roomCode, userRole]) => {
      informRoomOfUserListUpdate('user left', socket.id, userRole, roomCode);
    });
  });

}
