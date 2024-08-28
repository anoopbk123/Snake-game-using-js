//HTML elements
const board = document.getElementById("game-board");
const instructionText = document.getElementById('instruction-text');
const logo = document.getElementById('logo');

//Variables
const gridSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = generateFood();
let direction = 'right'
let gameInterval;
let gameSpeedDelay = 300;
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
    increaseSpeed();
    clearInterval(gameInterval);
    gameInterval = setInterval(()=>{
      moveSnake()
    //checkCollision();
      draw()
    }, gameSpeedDelay)
  }
  else{
    snake.pop()
  }
}

function startGame(){
  gameStarted = true;
  instructionText.style.display = 'none';
  logo.style.display = 'none';
  gameInterval = setInterval(()=>{
    moveSnake()
    //checkCollision();
    draw();
  }, gameSpeedDelay);
}

// setInterval(()=>{
//   moveSnake()
//   draw()
// },200)

//Key press actions
function handleKeyPress(event){
  if((!gameStarted && event.code === 'Space') || (!gameStarted && event.key === ' ') ){
    startGame();
  }else{
    switch (event.key){
      case 'ArrowUp':
        direction = 'up';
        break;
      case 'ArrowDown':
        direction = 'down';
        break;
      case 'ArrowRight':
        direction = 'right';
        break;
      case 'ArrowLeft':
        direction = 'left';
        break;
    }
  }
}

document.addEventListener('keydown', handleKeyPress);

function increaseSpeed(){
  gameSpeedDelay -= 5;
}

//Button actions for touch control
function handleButtonPress(e){
  direction = e.target.innerHTML
}

