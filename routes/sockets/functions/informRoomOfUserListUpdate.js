module.exports = function informRoomOfUserListUpdate(updateType, socketID, userRole, roomCode) {
  const socket = io.sockets.sockets[socketID];
  const username = io.sockets.sockets[socketID].username;
  socket.to(roomCode).emit('update user list', updateType, socketID, username, userRole);
};
