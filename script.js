let board = Array(9).fill(null);
let currentPlayer = "X";
let gameActive = true;

const gameBoard = document.getElementById("game-board");
const statusText = document.getElementById("status");

function renderBoard() {
  gameBoard.innerHTML = "";
  board.forEach((cell, index) => {
    const cellDiv = document.createElement("div");
    cellDiv.className = "cell";
    cellDiv.textContent = cell;
    cellDiv.addEventListener("click", () => handleClick(index));
    gameBoard.appendChild(cellDiv);
  });
}

function handleClick(index) {
  if (!gameActive || board[index]) return;

  board[index] = currentPlayer;
  renderBoard();

  if (checkWinner()) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
  } else if (board.every(cell => cell)) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "Y" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWinner() {
  const winConditions = [
    [0,1,2], [3,4,5], [6,7,8], // rows
    [0,3,6], [1,4,7], [2,5,8], // cols
    [0,4,8], [2,4,6]           // diagonals
  ];

  return winConditions.some(([a,b,c]) => 
    board[a] && board[a] === board[b] && board[a] === board[c]
  );
}

function restartGame() {
  board = Array(9).fill(null);
  currentPlayer = "X";
  gameActive = true;
  statusText.textContent = `Player ${currentPlayer}'s turn`;
  renderBoard();
}

// Initial render
renderBoard();
