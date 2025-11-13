const square = document.getElementById("square");
const scoreDisplay = document.getElementById("score");
const highScoreDisplay = document.getElementById("highScore");
const sound = document.getElementById("sound");

let score = 0;

// cargar mejor puntuación guardada
let highScore = localStorage.getItem("highScore") || 0;
highScoreDisplay.textContent = highScore;

// velocidad del juego
let speed = 1500;
let interval = setInterval(moveSquare, speed);

// mover el cuadrado a posición aleatoria
function moveSquare() {
  const gameArea = document.getElementById("game-area");
  const maxX = gameArea.clientWidth - square.clientWidth;
  const maxY = gameArea.clientHeight - square.clientHeight;

  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  square.style.left = `${x}px`;
  square.style.top = `${y}px`;
}

// aumentar dificultad progresivamente
function increaseDifficulty() {
  if (speed > 400) {
    speed -= 100;
    clearInterval(interval);
    interval = setInterval(moveSquare, speed);
  }
}

// evento: clic para atrapar el cuadrado
square.addEventListener("click", () => {
  sound.currentTime = 0;
  sound.play();

  score++;
  scoreDisplay.textContent = score;

  // actualizar high score
  if (score > highScore) {
    highScore = score;
    localStorage.setItem("highScore", highScore);
    highScoreDisplay.textContent = highScore;
  }

  moveSquare();
  increaseDifficulty();
});

// iniciar el juego
moveSquare();
