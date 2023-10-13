import { possibleMovesFromPosition } from "./kt-helper.js";
import { findClosestPath } from "./kt-recursion.js";
import { getPath } from "./kt-tree-DFS.js";
const board = get2dBoard(document.querySelectorAll(".board .cell"));
const knight = document.createElement("div");
let paintedCells = [];
setKnightPosition(board[0][0]);
let lastPosition = { x: 0, y: 0 };
paintCells(possibleMovesFromPosition(lastPosition));
knight.classList.add("knight");
function setCoordinatesOnCells(board) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      board[i][j].setAttribute("data-x", j);
      board[i][j].setAttribute("data-y", i);
    }
  }
}
setCoordinatesOnCells(board);
document.addEventListener("mouseover", (event) => handleMouseOverEvent(event));
document.addEventListener("click", (event) => handlClickEvent(event));
function handlClickEvent(event) {
  if (event.target.classList.contains("cell")) {
    let xPosition = +event.target.getAttribute("data-x");
    let yPosition = +event.target.getAttribute("data-y");
    //let moves = findClosestPath(lastPosition, { x: xPosition, y: yPosition });
    let moves = getPath(lastPosition, { x: xPosition, y: yPosition });
    displayMoves(moves);
    lastPosition = { x: xPosition, y: yPosition };
  }
}
function handleMouseOverEvent(event) {
  if (event.target.classList.contains("cell")) {
    let xPosition = +event.target.getAttribute("data-x");
    let yPosition = +event.target.getAttribute("data-y");
    let positions = possibleMovesFromPosition({ x: xPosition, y: yPosition });
    paintCells(positions);
    paintCell(xPosition, yPosition);
  }
}
function get2dBoard(board) {
  let originalBoard = Array.from(board);
  let stack = [];
  for (let i = 0; i < board.length; i += 8) {
    stack.push(originalBoard.slice(i, i + 8));
  }
  stack.reverse();
  return stack;
}
function paintCell(x, y) {
  paintedCells.push(board[y][x]);
  board[y][x].classList.add("green");
}
function clearCells() {
  for (let i = 0; i < paintedCells.length; i++) {
    paintedCells[i].classList.remove("green");
  }
  paintedCells = [];
}
function paintCells(coordinates) {
  clearCells();
  for (let i = 0; i < coordinates.length; i++) {
    paintCell(coordinates[i].x, coordinates[i].y);
  }
}
function setKnightPosition(cell) {
  cell.append(knight);
}
function displayMoves(moves) {
  for (let i = 0; i < moves.length; i++) {
    setTimeout(() => {
      board[moves[i].y][moves[i].x].append(knight);
    }, i * 100);
  }
}
