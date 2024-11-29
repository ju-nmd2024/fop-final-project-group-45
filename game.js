/*
  Final Project - Game
    Akademien Invaders

  Alen Eminovic - emal24na 
  Hedda Petersson - pehe24kv
*/

let characterX = 300;
let characterY = 700;
let state = "start";
let edgeReached = false;
let enemies = [];
let rows = 5;
let columns = 8;
import Button from "./startScreen.js";
import Character from "./character.js";
import Bullet from "./bullet.js";
import Enemy from "./enemies.js";

function preload() {
  img = loadImage("/assets/jthBoyBack.png");
  img2 = loadImage("/assets/eyBro.png");
}

function setup() {
  createCanvas(600, 800);
}

//initialize start button
const startButton = new Button(175, 450, 250, 60, "Start the game", () => {
  state = "game";
});
//initialize instructions button
const instructionsButton = new Button(175, 550, 250, 60, "Instructions", () => {
  state = "instructions";
});
//initialize character
const character = new Character(characterX, characterY, 35, 45);
//initialize enemies
const enemy = new Enemy(10, 10, 30, 40);
for (let i = 0; i < rows; i++) {
  for (let j = 0; j < columns; j++) {
    let x = 50 + j * 50;
    let y = 50 + i * 50;
    enemies.push(new Enemy(x, y, 30, 40));
  }
}

function startScreen() {
  background(234, 30, 180);

  startButton.draw();
  startButton.hitTest(175, 450);
  instructionsButton.draw();
  instructionsButton.hitTest(175, 550);
}

function gameScreen() {
  background(30, 0, 180);
  character.draw();
  character.move();

  //bullets
  for (let bullet of bullets) {
    bullet.move();
    bullet.draw();

    if (bullet.shot()) {
      let bulletIndex = bullets.indexOf(bullet);
      if (bulletIndex !== -1) {
        bullets.splice(bulletIndex, 1);
      }
    }

    let edgeReached = false;

    for (let enemy of enemies) {
      enemy.draw();
      enemy.move();

      //maked that enemies have reached an edge
      if (enemy.enemyX <= 0 || enemy.enemyX + enemy.width >= 600) {
        edgeReached = true;
      }
    }

    if (edgeReached) {
      for (let enemy of enemies) {
        enemy.speed *= -0.5;
        enemy.moveDown();
      }
    }
  }
}

function instructionScreen() {
  background(90, 30, 180);
}

function draw() {
  if (state === "start") {
    startScreen();
  } else if (state === "game") {
    gameScreen();
  } else if (state === "instructions") {
    instructionScreen();
  }
}

function mouseClicked() {
  if (state === "start") {
    startButton.mouseClicked();
    instructionsButton.mouseClicked();
  }
}

function createBullet(x, y) {
  let bullet = new Bullet(x, y, 20, 32);
  bullets.push(bullet);
}

function keyPressed() {
  if (key === " ") {
    createBullet(character.x + 12, character.y - 15);
  }
}
