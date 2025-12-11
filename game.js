import { Character } from "./character";
import { Platform } from "./plataform";

let gravity = 0.35;
let jumpForce = -10.5;
let platforms = [];

function setup() {
  createCanvas(400, 600);
}

character = new Character( //to indicate what parameter we want for the size of the character
  width / 2 - 40 / 2, // x
  height - 100, // y
  40, // w
  40, // h
  jumpForce, // vy
  4 // speed
);

function draw() {
  background(155, 231, 255);
  drawcharacter();
}

function drawcharacter() {
  character.draw(); //indicates to draw the character with the form created
}
