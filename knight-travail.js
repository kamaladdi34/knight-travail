let board = new Array(8).fill(" ").map((_) => new Array(8).fill(" "));
function possibleMovesFromPosition(position) {
  let moves = [];
  function tryMove(move) {
    checkMove(move) ? moves.push(move) : undefined;
  }
  tryMove({ x: position.x + 1, y: position.y + 2 });
  tryMove({ x: position.x - 1, y: position.y + 2 });
  tryMove({ x: position.x + 1, y: position.y - 2 });
  tryMove({ x: position.x - 1, y: position.y - 2 });
  tryMove({ x: position.x + 2, y: position.y + 1 });
  tryMove({ x: position.x + 2, y: position.y - 1 });
  tryMove({ x: position.x - 2, y: position.y + 1 });
  tryMove({ x: position.x - 2, y: position.y - 1 });
  return moves;
}
function checkMove(position) {
  let xCheck = position.x >= 0 && position.x <= 7;
  let yCheck = position.y >= 0 && position.y <= 7;
  return xCheck && yCheck;
}
function setPossibleMoves(move) {
  let possibleMoves = possibleMovesFromPosition(move);
  for (let i = 0; i < possibleMoves.length; i++) {
    board[possibleMoves[i].x][possibleMoves[i].y] = "X";
  }
}
function printBoard() {
  for (let i = 0; i < board.length; i++) {
    let row = "";
    for (let j = 0; j < board[i].length; j++) {
      row += `[ ${board[i][j]} ]`;
    }
    console.log(row);
  }
}
