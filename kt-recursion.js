import { arrayIncludesMove } from "./kt-helper.js";
import { positionsAreSame } from "./kt-helper.js";
import { possibleMovesFromPosition } from "./kt-helper.js";

function findClosestPath(position, target) {
  let possibleMoves = possibleMovesFromPosition(position);
  let moves = [];
  for (let i = 0; i < possibleMoves.length; i++) {
    let result = findPath(possibleMoves[i], target);
    if (result != undefined) {
      moves.push(result);
    }
  }
  return moves;
}
function findPath(position, target, depth = 0, moves = []) {
  moves.push(position);
  if (positionsAreSame(position, target)) {
    return moves;
  } else if (depth > 20) {
    return undefined;
  }
  let possibleMoves = possibleMovesFromPosition(position);
  for (let i = 0; i < possibleMoves.length; i++) {
    if (arrayIncludesMove(possibleMoves[i], moves)) {
      continue;
    }
    let d = depth;
    let result = findPath(possibleMoves[i], target, ++d, [...moves]);
    if (result != undefined) {
      return result;
    }
  }
}
