const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreDisplay = document.getElementById("score");
const restartBtn = document.getElementById("restartBtn");

const box = 20; // size of one grid square
let score = 0;

// Initial snake
let snake = [];
snake[0] = { x: 9 * box, y: 10 * box };

// Food position
let food = {
  x: Math.floor(Math.random() * 19 + 1) * box,
  y: Math.floor(Math.random() * 19 + 1) * box
};

// Snake direction
let direction;

// Listen to key presses
document.addEventListener("keydown", directionControl);

function directionControl(event) {
  let key = event.keyCode;
  if (key == 37 && direction !== "RIGHT") direction = "LEFT";
  else if (key == 38 && direction !== "DOWN") direction = "UP";
  else if (key == 39 && direction !== "LEFT") direction = "RIGHT";
  else if (key == 40 && direction !== "UP") direction = "DOWN";
}

// Main draw function
function draw() {
  ctx.fillStyle = "#161b22";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw food
  ctx.fillStyle = "#ff0055";
  ctx.fillRect(food.x, food.y, box, box);

  // Draw snake
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i == 0 ? "#00ff99" : "#00cc77";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  // Old head position
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  // Move snake
  if (direction == "LEFT") snakeX -= box;
  if (direction == "UP") snakeY -= box;
  if (direction == "RIGHT") snakeX += box;
  if (direction == "DOWN") snakeY += box;

  // If eats food
  if (snakeX == food.x && snakeY == food.y) {
    score++;
    scoreDisplay.textContent = score;
    food = {
      x: Math.floor(Math.random() * 19 + 1) * box,
      y: Math.floor(Math.random() * 19 + 1) * box
    };
  } else {
    // Remove tail
    snake.pop();
  }

  // Add new head
  let newHead = { x: snakeX, y: snakeY };

  // Game over conditions
  if (
    snakeX < 0 ||
    snakeY < 0 ||
    snakeX >= canvas.width ||
    snakeY >= canvas.height ||
    collision(newHead, snake)
  ) {
    clearInterval(game);
    alert("💀 Game Over! Your Score: " + score);
  }

  snake.unshift(newHead);
}

function collision(head, array) {
  for (let i = 0; i < array.length; i++) {
    if (head.x == array[i].x && head.y == array[i].y) return true;
  }
  return false;
}

// Restart button
restartBtn.addEventListener("click", () => {
  document.location.reload();
});

let game = setInterval(draw, 150);
