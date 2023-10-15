import { positionsAreSame } from "./kt-helper.js";
import { possibleMovesFromPosition } from "./kt-helper.js";
import { arrayIncludesMove } from "./kt-helper.js";
class Move {
  constructor(position, parent, childMoves) {
    this.position = position;
    this.childMoves = childMoves;
    this.parent = parent;
  }
}
class Map {
  constructor(position, maxDepth) {
    this.maxDepth = maxDepth;
    this.root = this.createMap(position);
  }
  createMap(move, depth = 0, parent = this.root) {
    if (depth > this.maxDepth) {
      return null;
    }
    let newMove = new Move(move, parent);
    let possibleMoves = possibleMovesFromPosition(move);
    let childMoves = [];
    for (let i = 0; i < possibleMoves.length; i++) {
      childMoves.push(this.createMap(possibleMoves[i], ++depth, newMove));
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
  findPathBFS(targetMove) {
    let queue = [this.root];
    while (queue.length > 0) {
      let level = [];
      for (let i = 0; i < queue.length; i++) {
        if (!queue[i]) {
          continue;
        }
        if (positionsAreSame(queue[i].position, targetMove)) {
          return queue[i];
        }
        for (let j = 0; j < queue[i].childMoves.length; j++) {
          if (!queue[i].childMoves[j]) {
            continue;
          }
          level.push(queue[i].childMoves[j]);
        }
        queue.shift();
      }
      queue = queue.concat(level);
    }
  }
}

export function getPath(startPosition, targetPosition) {
  let map = new Map(startPosition, 20);
  return map.findPathDFS(map.root, targetPosition);
}
export function getBFSpath(startPosition, targetPosition) {
  let map = new Map(startPosition, 20);
  let move = map.findPathBFS(targetPosition);
  let parent = move;
  let moves = [];
  while (parent) {
    moves.push(parent.position);
    parent = parent.parent;
  }
  return moves.reverse();
}
