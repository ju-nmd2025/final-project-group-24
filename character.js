import { Character } from "./testCha.js";
import { Platform } from "./testPlatform2.js";

// ===== DOODLE JUMP IN P5.JS =====

// Player
let player;

let gravity = 0.35;
let jumpForce = -10.5;

// Platforms
let platforms = [];
let platformCount = 10;
let platformW = 65;
let platformH = 12;

// Game state
let score = 0;
let highScore = 0;
let gameOver = false;

function setup() {
  createCanvas(400, 600);
  textFont("system-ui");
  resetGame();
}

function resetGame() {
  score = 0;
  gameOver = false;

  // Reset player (dùng class Character)
  player = new Character(
    width / 2 - 40 / 2, // x
    height - 100, // y
    40, // w
    40, // h
    jumpForce, // vy
    4 // speed
  );

  // Create platforms
  platforms = [];
  let step = height / platformCount;
  for (let i = 0; i < platformCount; i++) {
    let x = random(width - platformW);
    let y = height - i * step - 40;
    platforms.push(createPlatform(x, y));
  }
}

function createPlatform(x, y) {
  // 20% là platform vỡ, còn lại là thường
  let r = random();
  let type = r < 0.2 ? "breakable" : "normal";
  return new Platform(x, y, platformW, platformH, type);
}

function draw() {
  background(155, 231, 255);

  if (!gameOver) {
    updatePlayer();
    updateCameraAndPlatforms();
    checkGameOver();
  }

  drawPlatforms();
  drawPlayer();
  drawHUD();

  if (gameOver) {
    drawGameOver();
  }
}

function updatePlayer() {
  // Horizontal movement
  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
    // A
    player.x -= player.speed;
  }
  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
    // D
    player.x += player.speed;
  }

  // Wrap around
  if (player.x + player.w < 0) player.x = width;
  if (player.x > width) player.x = -player.w;

  // Gravity
  player.vy += gravity;
  player.y += player.vy;

  // Collision with platforms (only when falling)
  if (player.vy > 0) {
    for (let p of platforms) {
      // nếu đã vỡ rồi thì bỏ qua, không cho nhảy lại
      if (p.broken) continue;

      let withinX = player.x + player.w > p.x && player.x < p.x + p.w;
      let wasAbove = player.y + player.h <= p.y;
      let willCross = player.y + player.h + player.vy >= p.y;

      if (withinX && wasAbove && willCross) {
        player.vy = jumpForce;
        score += 10;

        // nếu đây là platform vỡ → cho nó gãy
        if (p.type === "breakable") {
          p.broken = true;
        }
      }
    }
  }
}

function updateCameraAndPlatforms() {
  // update trạng thái platform (cái nào vỡ thì rơi)
  for (let p of platforms) {
    p.update();
  }

  // If player goes above mid-screen -> move world down
  if (player.y < height / 2) {
    let dy = height / 2 - player.y;
    player.y = height / 2;

    for (let p of platforms) {
      p.y += dy;
    }

    // Remove platforms that go off screen at bottom, add new on top
    for (let i = platforms.length - 1; i >= 0; i--) {
      if (platforms[i].y > height + platformH) {
        platforms.splice(i, 1);
        let newX = random(width - platformW);
        let newY = random(-80, -20);
        platforms.push(createPlatform(newX, newY));
      }
    }
  }
}

function checkGameOver() {
  if (player.y > height + 50) {
    gameOver = true;
    if (score > highScore) {
      highScore = score;
    }
  }
}

function drawPlayer() {
  player.draw();
}

function drawPlatforms() {
  for (let p of platforms) p.draw();
}

function drawHUD() {
  push();
  fill(0, 0, 0, 120);
  noStroke();
  rect(0, 0, width, 35);

  fill(255);
  textSize(16);
  textAlign(LEFT, CENTER);
  text("Score: " + score, 10, 18);
  textAlign(RIGHT, CENTER);
  text("Best: " + highScore, width - 10, 18);
  pop();
}

function drawGameOver() {
  push();
  fill(0, 0, 0, 150);
  noStroke();
  rect(0, height / 2 - 60, width, 120);

  fill(255);
  textAlign(CENTER, CENTER);
  textSize(28);
  text("Game Over", width / 2, height / 2 - 10);
  textSize(16);
  text("Press SPACE to restart", width / 2, height / 2 + 20);
  pop();
}

function keyPressed() {
  // Restart on SPACE
  if (gameOver && key === " ") {
    resetGame();
  }
}

// nếu bạn dùng <script type="module"> với p5, thêm dòng này:
window.setup = setup;
window.draw = draw;
window.keyPressed = keyPressed;
