const board = document.getElementById("gameCanvas");
const board_ctx = gameCanvas.getContext("2d");

board.addEventListener("click", GetClickedCell);

function GetClickedCell(event) {
  let clickX = event.clientX - board.offsetLeft;
  let clickY = event.clientY - board.offsetTop;

  let cellX = Math.floor(clickX / cellSize);
  let cellY = Math.floor(clickY / cellSize);

  boardData[CoordToIndex(cellX, cellY)] = "x";

  console.log(cellX + ", " + cellY);
}

const cellSize = 150;

const padding = 6;

const boardSize = 3;

let boardData = [];

Main();

function Main() {
  DrawBoard();
  requestAnimationFrame(Main);
}

function DrawBoard() {
  board_ctx.clearRect(0, 0, 600, 600);
  for (let x = 0; x < boardSize; x++) {
    for (let y = 0; y < boardSize; y++) {
      board_ctx.fillStyle = "black";
      board_ctx.rect(
        x * cellSize + padding,
        y * cellSize + padding,
        cellSize - padding,
        cellSize - padding
      );
      board_ctx.fill();
    }
  }
  // console.table(boardData);
  for (let x = 0; x < boardSize; x++) {
    for (let y = 0; y < boardSize; y++) {
      if (boardData[CoordToIndex(x, y)] != null) {
        board_ctx.font = "250px serif";
        board_ctx.fillStyle = "red";
        board_ctx.textAlign = "center";

        board_ctx.fillText(
          boardData[CoordToIndex(x, y)],
          x * cellSize + cellSize / 2,
          y * cellSize + cellSize / 2 + padding * 10
        );
      }
    }
  }
}

function CoordToIndex(x, y) {
  return y * boardSize + x;
}
