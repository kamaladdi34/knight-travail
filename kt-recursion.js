import { arrayIncludesMove } from "./kt-helper.js";
import { positionsAreSame } from "./kt-helper.js";
import { possibleMovesFromPosition } from "./kt-helper.js";

export function findClosestPath(position, target) {
  let possibleMoves = possibleMovesFromPosition(position);
  let moves = [];
  for (let i = 0; i < possibleMoves.length; i++) {
    let result = findPath(possibleMoves[i], target);
    if (result != undefined) {
      moves.push(result);
    }
  }
  moves.sort((a, b) => {
    return a.length - b.length;
  });
  return moves[0];
}
function findPath(position, target, depth = 1, moves = [], shortest = null) {
  moves.push(position);
  if (positionsAreSame(position, target)) {
    return moves;
  } else if (depth > 9) {
    return undefined;
  } else if (shortest != null && depth > shortest.length) {
    return undefined;
  }
  let possibleMoves = possibleMovesFromPosition(position);
  let shortestPath = null;
  for (let i = 0; i < possibleMoves.length; i++) {
    if (arrayIncludesMove(possibleMoves[i], moves)) {
      continue;
    }
    let d = depth;
    let result = findPath(possibleMoves[i], target, ++d, [...moves], shortest);
    if (result != undefined) {
      if (shortestPath == null || result.length < shortestPath.length) {
        shortestPath = result;
        shortest = result;
      }
    }
  }
  return shortestPath;
}
