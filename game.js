/*
  Final Project - Foundations of Programming TGPG14 T4410
    Game - Akademien Invaders

  Alen Eminovic - emal24na 
  Hedda Petersson - pehe24kv
  NMD24
*/

//Imported Images
//Help through https://p5js.org/reference/p5/loadImage/ Accessed: 2024-11-30
function preload() {
  jthBoyBack = loadImage("/assets/jthBoyBack.png");
  jthGirlFront = loadImage("/assets/jthGirlFront.png");
  eyBro = loadImage("/assets/eyBro.png");
  freeze = loadImage("/assets/freeze.png");
  gameBackground = loadImage("/assets/gameBackground.png");
  winScreen = loadImage("/assets/winScreen.png");
  lostScreen = loadImage("/assets/gameOver.png");
  instructions = loadImage("/assets/instructions.png");
  start = loadImage("/assets/start.png");
}
//help ended

let characterX = 300;
let characterY = 700;
let state = "game";
let edgeReached = false;
let enemies = [];
let rows = 5;
let columns = 8;
let maxBullets = 3;

//Imported files
import Button from "./startScreen.js";
import Character from "./character.js";
import Bullet from "./bullet.js";
import BulletEnemy from "./bulletEnemy.js";
import Enemy from "./enemies.js";

function setup() {
  createCanvas(600, 800);
}

//Buttons, changing to states
const startButton = new Button(175, 280, 250, 60, "Start the game", () => {
  state = "game";
});
//instructions button, changes to instructions state
const instructionsButton = new Button(175, 370, 250, 60, "Instructions", () => {
  state = "instructions";
});
//play again button, restarts the game
const playAgain = new Button(175, 220, 250, 60, "Play Again", () => {
  state = "game";
});
//menu button
const mainMenu = new Button(175, 300, 250, 60, "Main Menu", () => {
  state = "start";
});

//Initialize character
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

// Start screen
function startScreen() {
  image(start, 0, 0, 600, 800);
  startButton.draw();
  startButton.hitTest(175, 280);
  instructionsButton.draw();
  instructionsButton.hitTest(175, 370);
}

//Help from first year NMD student Tyra Edin, Accessed: 2024-11-30
function collisionEnemy(enemy, bullet) {
  return (
    bullet.x < enemy.enemyX + enemy.width &&
    bullet.x + bullet.width > enemy.enemyX &&
    bullet.y < enemy.enemyY + enemy.height &&
    bullet.y + bullet.height > enemy.enemyY
  );
}

function collisionCharacter(character, bulletEnemy) {
  return (
    bulletEnemy.x < character.x + character.width &&
    bulletEnemy.x + bulletEnemy.width > character.x &&
    bulletEnemy.y < character.y + character.height &&
    bulletEnemy.y + bulletEnemy.height > character.y
  );
}
//Help from student, ended.

//Game screen
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

    //makes the enemies stop when they reach the bar
    if (enemy.enemyY >= 550) {
      state = "gameOver";
    }

    // Checking collsion between bullets and the enemies
    for (let j = bullets.length - 1; j >= 0; j--) {
      let bullet = bullets[j];
      if (collisionEnemy(enemy, bullet)) {
        bullets.splice(j, 1); //splice removes bullet
        enemies.splice(i, 1); //slice removes the enemy
      }
    }
  }
  // making the bullet disapear if you miss
  // if (bullet[j].y > 0) {
  //   bullets.splice(j, 1);
  // }

  if (edgeReached) {
    for (let enemy of enemies) {
      enemy.speed *= -1;
      enemy.moveDown();
    }
  }

  // Draw the character and make it move
  character.draw();
  character.move();

  // Draw the bullets
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

//Instruction screen
function instructionScreen() {
  image(instructions, -20, 0, 634, 820);
}

//Game over screen
function gameOver() {
  image(lostScreen, 0, 0, 600, 800);
  playAgain.draw();
  mainMenu.draw();
}

//Win screen
function win() {
  image(winScreen, 0, 0, 600, 800);
  playAgain.draw();
  mainMenu.draw();
}

//Re-play / restart-screen
function rePlay() {
  let characterX = 300;
  let characterY = 700;
  let state = "game";
  let edgeReached = false;
  let enemies = [];
  let rows = 5;
  let columns = 8;
  let maxBullets = 3;
}

function draw() {
  if (state === "start") {
    startScreen();
  } else if (state === "instructions") {
    instructionScreen();
  } else if (state === "game") {
    gameScreen();
  } else if (state === "gameOver") {
    gameOver();
  } else if (state === "win") {
    win();
  } else if (state === "rePlay") {
    rePlay();
  } else if (state === "rePlay") {
    startScreen();
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
  } else if (state === "gameOver") {
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
