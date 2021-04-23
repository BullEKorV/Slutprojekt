const board = document.getElementById("gameCanvas");
const board_ctx = gameCanvas.getContext("2d");

board.addEventListener("click", GetClickedCell);

function GetClickedCell(event) {
  let clickX = event.clientX - board.offsetLeft;
  let clickY = event.clientY - board.offsetTop;

  let cellX = Math.floor(clickX / cellSize);
  let cellY = Math.floor(clickY / cellSize);
  console.log(cellX + ", " + cellY);
}

const cellSize = 150;

const padding = 6;

const boardSize = 3;

let boardData = [];

for (let y = 0; y < boardSize; y++) {
  for (let x = 0; x < boardSize; x++) {
    board_ctx.rect(
      x * cellSize + padding,
      y * cellSize + padding,
      cellSize - padding,
      cellSize - padding
    );
    console.log(x * cellSize + padding);
    board_ctx.fill();
  }
}

function DrawBoard() {
  for (let x = 0; x < boardSize; x++) {
    for (let y = 0; y < boardSize; y++) {}
  }
}

function CoordToIndex(x, y) {
  return y * boardSize + x;
}
