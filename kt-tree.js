import { positionsAreSame } from "./kt-helper.js";
import { possibleMovesFromPosition } from "./kt-helper.js";
import { arrayIncludesMove } from "./kt-helper.js";
class Move {
  constructor(position, childMoves) {
    this.position = position;
    this.childMoves = childMoves;
  }
}
class Map {
  constructor(position, maxDepth) {
    this.maxDepth = maxDepth;
    this.root = this.createMap(position);
  }
  createMap(move, depth = 0) {
    if (depth > this.maxDepth) {
      return null;
    }
    let newMove = new Move(move);
    let possibleMoves = possibleMovesFromPosition(move);
    let childMoves = [];
    for (let i = 0; i < possibleMoves.length; i++) {
      childMoves.push(this.createMap(possibleMoves[i], ++depth));
    }
    newMove.childMoves = childMoves;
    return newMove;
  }
  findPathDFS(move = this.root, position, moves = []) {
    if (move == undefined) {
      return undefined;
    }
    if (arrayIncludesMove(move.position, moves)) {
      return undefined;
    }
    moves.push(move.position);
    if (positionsAreSame(move.position, position)) {
      return moves;
    }
    let paths = [];
    for (let i = 0; i < move.childMoves.length; i++) {
      let result = this.findPathDFS(move.childMoves[i], position, [...moves]);
      if (result != undefined) {
        paths.push(result);
      }
    }
    paths.sort((a, b) => a.length - b.length);
    return paths[0];
  }
  findPathBFS() {}
}

export function getPath(startPosition, targetPosition) {
  let map = new Map(startPosition, 20);
  return map.findPathDFS(map.root, targetPosition);
}
