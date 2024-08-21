//HTML elements
const board = document.getElementById("game-board");

//Variables
const gridSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = generateFood();
let direction = 'right'
let gameInterval;
let gameSpeedDelay;
let gameStarted = false;

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

//moving snake
function moveSnake(){
  const head = {...snake[0]};
  switch(direction){
    case 'up':
      head.y --;
      break;
    case 'down':
      head.y ++;
      break;
    case 'right':
      head.x ++;
      break;
    case 'left':
      head.x --;
      break;
  }
  snake.unshift(head)
  if(head.x === food.x && head.y === food.y){
    food = generateFood();
    clearInterval();
    gameInterval = setInterval(()=>{
      moveSnake()
      draw()
    }, gameSpeedDelay)
  }
  else{
    snake.pop()
  }
}

function startGame(){
  gameStarted = true;
}

// setInterval(()=>{
//   moveSnake()
//   draw()
// },200)

//Button actions for touch control
function handleButtonPress(e){
  direction = e.target.innerHTML
}