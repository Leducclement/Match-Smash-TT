let scoreRed = 0;
let scoreBlue = 0;
let smashRed = 0;
let smashBlue = 0;
let gameOver = false;
let animationId = null;

function point(team) {
  if (gameOver) return;
  if (team === "red") scoreRed++;
  if (team === "blue") scoreBlue++;
  checkWinner();
  update();
}

function smash(team) {
  if (gameOver) return;
  if (team === "red") {
    scoreRed++;
    smashRed++;
  }
  if (team === "blue") {
    scoreBlue++;
    smashBlue++;
  }
  checkWinner();
  update();
}

function checkWinner() {
  if (smashRed >= 2) {
    win("🔴 Victoire Rouge : 2 SMASHS");
  } else if (smashBlue >= 2) {
    win("🔵 Victoire Bleu : 2 SMASHS");
  } else if (scoreRed >= 7) {
    win("🔴 Victoire Rouge : 7 points");
  } else if (scoreBlue >= 7) {
    win("🔵 Victoire Bleu : 7 points");
  }
}

function win(text) {
  document.getElementById("winner").textContent = text;
  gameOver = true;
  launchConfetti();
}

function update() {
  document.getElementById("scoreRed").textContent = scoreRed;
  document.getElementById("scoreBlue").textContent = scoreBlue;
  document.getElementById("smashRed").textContent = smashRed;
  document.getElementById("smashBlue").textContent = smashBlue;
}

function resetGame() {
  scoreRed = 0;
  scoreBlue = 0;
  smashRed = 0;
  smashBlue = 0;
  gameOver = false;
  document.getElementById("winner").textContent = "";
  stopConfetti();
  update();
}

let pieces = [];

function launchConfetti() {
  const canvas = document.getElementById("confetti");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  pieces = [];

  for (let i = 0; i < 150; i++) {
    pieces.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - 500,
      size: 10,
      speed: Math.random() * 5 + 2,
      color: `hsl(${Math.random() * 360},100%,50%)`
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach(p => {
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x, p.y, p.size, p.size);
      p.y += p.speed;
    });
    animationId = requestAnimationFrame(draw);
  }

  draw();
}

function stopConfetti() {
  cancelAnimationFrame(animationId);
  const canvas = document.getElementById("confetti");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
