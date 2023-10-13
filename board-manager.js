import { possibleMovesFromPosition } from "./kt-helper.js";
const board = get2dBoard(document.querySelectorAll(".board .cell"));
let paintedCells = [];
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
function handleMouseOverEvent(event) {
  if (event.target.classList.contains("cell")) {
    let xPosition = event.target.getAttribute("data-x");
    let yPosition = event.target.getAttribute("data-y");
    let positions = possibleMovesFromPosition({ x: +xPosition, y: +yPosition });
    paintCells(positions);
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
