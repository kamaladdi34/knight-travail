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
function positionsAreSame(position, targetPosition) {
  return position.x == targetPosition.x && position.y == targetPosition.y;
}
function findClosestPath(position, target) {
  let possibleMoves = possibleMovesFromPosition(position);
  let moves = [];
  for (let i = 0; i < possibleMoves.length; i++) {
    let result = findPath(possibleMoves[i], target, position);
    if (result != undefined) {
      moves.push(result);
    }
  }
  console.log(moves);
}
function findPath(
  position,
  target,
  lastSecond,
  depth = 1,
  moves = [],
  step = 1
) {
  console.log(position, lastSecond, step);
  if (step == 2) {
    step = 0;
    if (positionsAreSame(position, lastSecond)) {
      console.log("position already visited");
      return;
    }
    lastSecond = position;
  }
  moves.push(position);
  if (positionsAreSame(position, target)) {
    return moves;
  } else if (depth > 10) {
    return undefined;
  }
  let possibleMoves = possibleMovesFromPosition(position);
  for (let i = 0; i < possibleMoves.length; i++) {
    let d = depth;
    let s = step;
    let result = findPath(
      possibleMoves[i],
      target,
      lastSecond,
      ++d,
      [...moves],
      ++s
    );
    if (result != undefined) {
      return result;
    }
  }
}
let start = { x: 0, y: 0 };
let target = { x: 4, y: 4 };
console.log(findClosestPath(start, target));
