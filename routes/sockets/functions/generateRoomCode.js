const randomChoice = require('./randomChoice');



module.exports = function generateRoomCode(stringLength=4) {
  let roomCode;
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  const profanity = require('./profanity');

  const attemptCodeGeneration = () => {
    return ([...Array(stringLength)].map(() => randomChoice(alphabet))).join('');
  };

  do { roomCode = attemptCodeGeneration(); }
  while (
    Object.keys(io.sockets.adapter.rooms).includes(roomCode) ||
    profanity.includes(roomCode)
  );

  return roomCode;
};
