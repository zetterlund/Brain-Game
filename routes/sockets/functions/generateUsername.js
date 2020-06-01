const randomChoice = require('./randomChoice');



const namesList = [
  'Ross',
  'Joey',
  'Chandler',
  'Monica',
  'Rachel',
  'Phoebe'
];

const randomNumber = (min, max) => {  
  return Math.floor(Math.random() * (max - min) + min); 
};

module.exports = function generateUsername() {
  const allUsernames = Object.values(io.sockets.sockets).map(x => x.username);
  let username, name, number;
  while (true) {
    name = randomChoice(namesList);
    number = randomNumber(1, 100);
    username = name + number.toString();
    if (!allUsernames.includes(username)) {
      break;
    }
  }
  return username;
};
