const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
app.use(express.static("public"));
// server code goes here!
// first listen for connection using io.on
// then... within callback, use socket.on, socket.emit, socket.broadcast, etc.
// NOTE THAT WE ARE LISTENING WITH server, NOT app!

let playerPositions = [0, 0];
let gameOver = false;
io.on("connection", (socket) => {
  socket.emit("positionUpdate", { playerPositions });

  socket.on("playerClick", function (data) {
    if (!gameOver) {
      playerPositions[data.index] += 1;
      io.emit("positionUpdate", { playerPositions });

      if (playerPositions[0] > 10) {
        io.emit("gameOver", { winner: 1 });
        gameOver = true;
      } else if (playerPositions[1] > 10) {
        io.emit("gameOver", { winner: 2 });
        gameOver = true;
      }
    }
  });
});
server.listen(3000);
