//HTML elements
const board = document.getElementById("game-board");

//Variable
const gridSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = generateFood();

//Draw game
function draw() {
  board.innerHTML = "";
  drawSnake();
  drawFood();
}

//Draw Snake
function drawSnake() {
  snake.forEach((segment) => {
    const snakeElement = createGameElement("div", "snake");
    setPosition(snakeElement, segment);
    board.appendChild(snakeElement);
  });
}

//Draw food
function drawFood() {
  const foodElement = createGameElement("div", "food");
  setPosition(foodElement, food);
  board.appendChild(foodElement);
}

//Generate food
function generateFood() {
  const x = Math.floor(Math.random() * gridSize) + 1;
  const y = Math.floor(Math.random() * gridSize) + 1;
  return { x, y };
}

//for creating game elements(snake and food)
function createGameElement(tag, className) {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

//set position of food or snake
function setPosition(element, position) {
  element.style.gridColumn = position.x;
  element.style.gridRow = position.y;
}

draw()
