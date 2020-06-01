module.exports = function joinUserToRoom(socketID, userRole, roomCode) {
  return new Promise((resolve, reject) => {

    const user = io.sockets.sockets[socketID];
    console.log('userRole:', userRole);

    // Join user to room
    user.join(roomCode, () => {

      // Update socket.io room with user's username and role information
      io.sockets.adapter.rooms[roomCode].sockets[socketID] = {
        name: user.username,
        role: userRole
      };

      // Update socket.io user's information with room/role information
      io.sockets.adapter.sids[socketID][roomCode] = userRole;

      resolve();

    });
  });
};
