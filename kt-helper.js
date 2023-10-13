export function possibleMovesFromPosition(position) {
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
export function checkMove(position) {
  let xCheck = position.x >= 0 && position.x <= 7;
  let yCheck = position.y >= 0 && position.y <= 7;
  return xCheck && yCheck;
}
export function positionsAreSame(position, targetPosition) {
  return position.x == targetPosition.x && position.y == targetPosition.y;
}
export function arrayIncludesMove(move, array) {
  let isIncluded = false;
  for (let i = 0; i < array.length; i++) {
    if (positionsAreSame(move, array[i])) {
      isIncluded = true;
    }
  }
  return isIncluded;
}
