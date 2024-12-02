/*
  Final Project - Game
    Akademien Invaders

  Alen Eminovic - emal24na 
  Hedda Petersson - pehe24kv
*/

//loading the images
function preload() {
  jthBoyBack = loadImage("/assets/jthBoyBack.png");
  jthGirlFront = loadImage("/assets/jthGirlFront.png");
  eyBro = loadImage("/assets/eyBro.png");
  freeze = loadImage("/assets/freeze.png");
  gameBackground = loadImage("/assets/gameBackground.png");
}

let characterX = 300;
let characterY = 700;
let state = "start";
let edgeReached = false;
let enemies = [];
let rows = 5;
let columns = 8;
let maxBullets = 3;

//imported files
import Button from "./startScreen.js";
import Character from "./character.js";
import Bullet from "./bullet.js";
import BulletEnemy from "./bulletEnemy.js";
import Enemy from "./enemies.js";

function setup() {
  createCanvas(600, 800);
}

//start game button, changes to gamestate
const startButton = new Button(175, 450, 250, 60, "Start the game", () => {
  state = "game";
});
//instructions button, changes to instructions state
const instructionsButton = new Button(175, 550, 250, 60, "Instructions", () => {
  state = "instructions";
});
//play again button, restarts the game
const playAgain = new Button(175, 459, 250, 60, "Play Again", () => {
  state = "game";
});
//menu button
const mainMenu = new Button(175, 550, 250, 60, "Main Menu", () => {
  state = "game";
});
//initialize character
const character = new Character(characterX, characterY, 50, 80);
//initialize enemies
const enemy = new Enemy(10, 10, 30, 40);
for (let i = 0; i < rows; i++) {
  for (let j = 0; j < columns; j++) {
    let x = 0 + j * 60;
    let y = 60 + i * 70;
    enemies.push(new Enemy(x, y, 40, 65));
  }
}

function startScreen() {
  background(234, 30, 180);

  startButton.draw();
  startButton.hitTest(175, 450);
  instructionsButton.draw();
  instructionsButton.hitTest(175, 550);
}

//Tyra Edin
function collisionEnemy(enemy, bullet) {
  return (
    bullet.x < enemy.enemyX + enemy.width &&
    bullet.x + bullet.width > enemy.enemyX &&
    bullet.y < enemy.enemyY + enemy.height &&
    bullet.y + bullet.height > enemy.enemyY
  );
}

function collisionCharacter(character, bullet) {
  return (
    bulletEnemy.x < character.x + character.width &&
    bulletEnemy.x + bulletEnemy.width > character.x &&
    bulletEnemy.y < character.y + character.height &&
    bulletEnemy.y + bulletEnemy.height > character.y
  );
}
//Tyra end

function gameScreen() {
  image(gameBackground, 0, 0, 600, 800);

  let edgeReached = false;

  // Loop through enemies and move them
  for (let i = 0; i < enemies.length; i++) {
    let enemy = enemies[i];
    enemy.draw();
    enemy.move();

    //check if enemy reached edge
    if (enemy.enemyX <= 0 || enemy.enemyX + enemy.width >= 600) {
      edgeReached = true;
    }

    //checking collsion between bullets and the enemies
    for (let j = bullets.length - 1; j >= 0; j--) {
      let bullet = bullets[j];
      if (collisionEnemy(enemy, bullet)) {
        bullets.splice(j, 1); //splice removes bullet
        enemies.splice(i, 1); //slice removes the enemy
      }
    }
  }

  if (edgeReached) {
    for (let enemy of enemies) {
      enemy.speed *= -1;
      enemy.moveDown();
    }
  }

  //draw the character and make it move
  character.draw();
  character.move();

  //draw the bullets
  for (let bullet of bullets) {
    if (bullets.y < 0) {
      bullet.splice();
    } else {
      bullet.move();
      bullet.draw();
    }
  }

  if (enemies.length === 0) {
    state = "win";
  }
}

function instructionScreen() {
  background(90, 30, 180);
}

function gameOver() {
  background(0);
  playAgain.draw();
}

function win() {
  background(255);
  playAgain.draw();
  mainMenu.draw();
}

function draw() {
  if (state === "start") {
    startScreen();
  } else if (state === "instructions") {
    instructionScreen();
  } else if (state === "game") {
    gameScreen();

    if (enemy.enemyY > 300) {
      state = "gameOver";
    }
  } else if (state === "gameOver") {
    gameOver();
  } else if (state === "win") {
    win();
  }
}

function mouseClicked() {
  if (state === "start") {
    startButton.mouseClicked();
    instructionsButton.mouseClicked();
  } else if (state === "instructions") {
    state = "start";
  } else if (state === "win") {
    playAgain.mouseClicked();
    mainMenu.mouseClicked();
  }
}

function createBullet(x, y) {
  let bullet = new Bullet(x, y, 20, 32);
  bullets.push(bullet);
}

function keyPressed() {
  if (key === " " && bullets.length < maxBullets) {
    //checks if bullets are less than 3, the max length of array
    createBullet(character.x + 12, character.y - 15); //if less create more bullets
  }
}
