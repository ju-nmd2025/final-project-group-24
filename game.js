import { Character } from "./character";
import { Platform } from "./plataform";

let gravity = 0.35;
let jumpForce = -10.5;

// Platforms parameters
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
  resetGame();
}

function resetGame() {
  score = 0;
  gameOver = false;

  // Reset player
  character = new Character(
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
  let r = random();
  let type = r < 0.2 ? "breakable" : "normal";
  return new Platform(x, y, platformW, platformH, type);
} //20% is break platform

function draw() {
  background(155, 231, 255);

  if (!gameOver) {
    updatecharacter();
    updateCameraAndPlatforms();
    checkGameOver();
  }

  drawPlatforms();
  drawcharacter();
  drawHUD();

  if (gameOver) {
    drawGameOver();
  }
}

function updatecharacter() {
  // Horizontal movement
  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
    // A
    character.x -= character.speed;
  }
  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
    // D
    character.x += character.speed;
  }

  // Wrap around
  if (character.x + character.w < 0) character.x = width;
  if (character.x > width) character.x = -character.w;

  // Gravity
  character.vy += gravity;
  character.y += character.vy;

  // Collision with platforms (only when falling)
  if (character.vy > 0) {
    for (let p of platforms) {
      let withinX = character.x + character.w > p.x && character.x < p.x + p.w;
      let wasAbove = character.y + character.h <= p.y;
      let willCross = character.y + character.h + character.vy >= p.y;

      if (withinX && wasAbove && willCross) {
        character.vy = jumpForce;
        score += 10;
      }
    }
  }
}

function updateCameraAndPlatforms() {
  // If player goes above mid-screen -> move world down
  if (character.y < height / 2) {
    let dy = height / 2 - character.y;
    character.y = height / 2;

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
  if (character.y > height + 50) {
    gameOver = true;
    if (score > highScore) {
      highScore = score;
    }
  }
}

function drawcharacter() {
  character.draw();
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
