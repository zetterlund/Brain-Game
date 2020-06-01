const express = require('express');
const app = express();
const server = require('http').Server(app);
const socketIO = require('socket.io');
const path = require('path');

const port = process.env.PORT || 5000;



/* Initiate connection to database */
const db = require('./config/db').connect();



// JSON-parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



/* Routes */

// (Simulate production domain subdirectory while in development)
const subd = require('./config/deployment').subdirectory;

const questions = require('./routes/api/questions');
app.use(subd+'/api/questions', questions);

const getSetupOptions = require('./routes/api/getSetupOptions');
app.use(subd+'/api/getSetupOptions', getSetupOptions);



/* (Serve static assets if in production) */
if (process.env.NODE_ENV === 'production') {

  // Set static folder
  app.use(express.static('client/build'));

  // Set catch-all route to redirect requests to home page
  app.get('*', (req, res) => {
    console.log('req:', req);
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
} 



/* SocketIO */

// (Used global variable here to easily access SocketIO object from within modules.  Could probably be better-refactored.)
global.io = socketIO(server);

const attachSocketPaths = require('./routes/sockets/attachSocketPaths');

io.on('connection', socket => {
  console.log('New client connected...');
  attachSocketPaths(socket);
});



/* Listen for traffic */
server.listen(port, () => console.log(`Server started on port ${port}`));
