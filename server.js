const express = require("express");
const app = express();
const server = require("http").Server(app);
const socketIO = require("socket.io");
const path = require("path");
const rateLimit = require("express-rate-limit");

const port = process.env.PORT || 8002;

/* Set rate limiter */
const rateLimiter = rateLimit({
  windowMs: 30 * 1000,
  max: 5,
});
app.use(rateLimiter);

/* Initiate connection to database */
const db = require("./config/db").connect();

// JSON-parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* Routes */
const subRouter = express.Router();
subRouter.use("/api/questions", require("./routes/api/questions"));
subRouter.use("/api/getSetupOptions", require("./routes/api/getSetupOptions"));
// (Simulate production domain subdirectory while in development.  Otherwise, remove 'subRouter' and attach routes directly to 'app')
app.use(require("./config/deployment").subdirectory, subRouter);

/* (Serve static assets if in production) */
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  // Set catch-all route to redirect requests to home page
  app.get("*", (req, res) => {
    console.log("req:", req);
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

/* SocketIO */

// (Used global variable here to easily access SocketIO object from within modules.  Could probably be better-refactored.)
global.io = socketIO(server);

const attachSocketPaths = require("./routes/sockets/attachSocketPaths");

io.on("connection", (socket) => {
  console.log("New client connected...");
  attachSocketPaths(socket);
});

/* Listen for traffic */
server.listen(port, () => console.log(`Server started on port ${port}`));
