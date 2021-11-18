document.addEventListener("DOMContentLoaded", main);

function main() {
  const socket = io();
  let button1 = document.querySelector(".player1Btn");
  let button2 = document.querySelector(".player2Btn");
  let p1 = document.querySelector(".player1");
  let p2 = document.querySelector(".player2");

  // let playArea = document.querySelector(".play-area");
  // console.log(playArea);

  button1.addEventListener("click", function (ev) {
    console.log(`p1click`);
    socket.emit("playerClick", { index: 0 });
  });

  button2.addEventListener("click", function (ev) {
    console.log(`p2click`);
    socket.emit("playerClick", { index: 1 });
  });

  socket.on("positionUpdate", function (data) {
    console.log(data);
    p1.style.left = data.playerPositions[0] * 20 + "px";
    p2.style.left = data.playerPositions[1] * 20 + "px";
  });

  socket.on("gameOver", function (data) {
    const h1 = document.createElement("h1");
    h1.textContent = `Winner is player ${data.winner}`;
    document.body.appendChild(h1);
  });
}
