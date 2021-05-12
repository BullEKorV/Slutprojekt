const board = document.getElementById("gameCanvas");
const board_ctx = gameCanvas.getContext("2d");

const cellSize = 150;

const padding = 6;

const topOffset = 50;

const boardSize = 3;

let boardData = [];

const boardValues = [4, 3, 8, 9, 5, 1, 2, 7, 6];

let currentPlayer = "x";

board.width = (cellSize + padding) * boardSize;
board.height = (cellSize + padding) * boardSize + topOffset;

board.addEventListener("click", GetClickedCell);

function GetClickedCell(event) {
  let clickX = event.clientX - board.offsetLeft;
  let clickY = event.clientY - board.offsetTop - topOffset;

  let cellX = Math.floor(clickX / cellSize);
  let cellY = Math.floor(clickY / cellSize);

  if (boardData[CoordToIndex(cellX, cellY)] == null) {
    boardData[CoordToIndex(cellX, cellY)] = currentPlayer;
    if (CheckWin(currentPlayer)){
      console.log("Yatzy! " + currentPlayer);
    }
    currentPlayer = NextPlayer(currentPlayer);
  }
}
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
        y * cellSize + padding + topOffset,
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
          y * cellSize + cellSize / 2 + padding * 10 + topOffset
        );
      }
    }
  }
}

function CoordToIndex(x, y) {
  return y * boardSize + x;
}

function NextPlayer(player) {
  if (player === "x") return (player = "o");
  else return (player = "x");
}

function CheckWin(currentPlayer) {
  let numbOfPlacements = 0;
  let values = [];

  for (let i = 0; i < boardData.length; i++) {
    if (boardData[i] === currentPlayer) {
      numbOfPlacements++;
      values.push(boardValues[i]);
    }
  }

  let sum = 0;
  for (let i = 0; i < values.length; i++) {
    for (let y = 0; y < values.length; y++) {
      sum = 0;
      for (let v = 0; v < values.length; v++) {
        if (
          numbOfPlacements === 3 ||
          (numbOfPlacements === 4 && v !== i) ||
          (numbOfPlacements === 5 && v !== i && v !== y)
        )
          sum += values[v];
      }
      if (sum === 15) {
        return true;
      }
    }
  }
  return false;
  // https://stackoverflow.com/questions/2670217/detect-winning-game-in-nought-and-crosses FUCK YEAH SMART ALGORITHM
}
