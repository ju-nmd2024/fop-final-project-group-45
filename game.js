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
//help from p5 ended

//Imported files
import Button from "./startScreen.js";
import Character from "./character.js";
import Bullet from "./bullet.js";
import EnemyBullet from "./bulletEnemy.js";
import Enemy from "./enemies.js";

let characterX = 300;
let characterY = 700;
let enemyX = 10;
let enemyY = 10;
let state = "start";
let enemies = [];
let enemyBullets = [];
let rows = 5;
let columns = 8;
let maxBullets = 3;
let score = 0;

function setup() {
  createCanvas(600, 800);
  let bullets = [];
}

//Start button, changes to game Screen
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

//Showing when an enemy will dissapear
//Help from first year NMD student Tyra Edin
function collisionEnemy(enemy, bullet) {
  return (
    bullet.x < enemy.enemyX + enemy.width &&
    bullet.x + bullet.width > enemy.enemyX &&
    bullet.y < enemy.enemyY + enemy.height &&
    bullet.y + bullet.height > enemy.enemyY
  );
}

function collisionCharacter(character, enemyBullet) {
  return (
    enemyBullet.x < character.x + character.width &&
    enemyBullet.x + enemyBullet.width > character.x &&
    enemyBullet.y < character.y + character.height &&
    enemyBullet.y + enemyBullet.height > character.y
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

    //check if enemy reached edge of canvas
    if (enemy.enemyX <= 0 || enemy.enemyX + enemy.width >= 600) {
      edgeReached = true;
    }

    //makes the enemies stop when they reach the bar
    if (enemy.enemyY >= 550) {
      state = "gameOver";
    }

    //Help from second year NMD student Erik Sandquist
    // Checking collsion between bullets and the enemies
    for (let j = 0; j < bullets.length; j++) {
      let bullet = bullets[j];
      if (collisionEnemy(enemy, bullet)) {
        //Help from student Erik Sandquist ended

        bullets.splice(j, 1); //splice removes bullet
        enemies.splice(i, 1); //splice removes the enemy
        score = score + 10;

        //Help from second year NMD student Erik Sandquist
        i--;
        break;
        //Help from student Erik Sandquist ended
      }
    }
  }

  for (let j = 0; j < enemyBullets.length; j++) {
    let enemyBullet = enemyBullets[j];
    if (collisionCharacter(character, enemyBullet)) {
      //Help from student Erik Sandquist ended

      enemyBullet.splice(j, 1); //splice removes bullet
      character.splice(i, 1); //splice removes the enemy

      //Help from second year NMD student Erik Sandquist
      i--;
      break;
      //Help from student Erik Sandquist ended
    }
  }

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
    if (bullets.y <= 0) {
      bullet.splice();
    } else {
      bullet.move();
      bullet.draw();
    }
  }

  // Draw the enemyBullets
  for (let enemyBullet of enemyBullets) {
    if (enemyBullets.y <= 800) {
      enemyBullet.splice();
    } else {
      enemyBullet.move();
      enemyBullet.draw();
    }
  }

  if (enemies.length === 0) {
    state = "win";
  }
  //Scores
  push();
  textSize(20);
  fill(255);
  //Help from second year NMD student Erik Sandquist
  text(`SCORE: ${score}`, 25, 35);
  //End of help from Erik Sandquist
  pop();
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

// function resetGame() {
//   let score = 0;
//   enemyX = 10;
//   enemyY = 10;
// }

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
  }
}

function mouseClicked() {
  if (state === "start") {
    startButton.mouseClicked(); // added buttons on start screen
    instructionsButton.mouseClicked();
  } else if (state === "instructions") {
    state = "start";
  } else if (state === "win") {
    //added buttons on win screen
    playAgain.mouseClicked();
    mainMenu.mouseClicked();
    // resetGame();
  } else if (state === "gameOver") {
    //added buttons on gameover screen
    playAgain.mouseClicked();
    mainMenu.mouseClicked();
    // resetGame();
  }
}

function createBullet(x, y) {
  let bullet = new Bullet(x, y, 20, 32);
  bullets.push(bullet);
}

function createEnemyBullet(x, y) {
  let enemyBullet = new EnemyBullet(enemy.width / 2, enemy.height, 20, 32);
  enemyBullets.push(enemyBullet);
}

function keyPressed() {
  if (key === " " && bullets.length < maxBullets) {
    //checks if bullets are less than 3, the max length of array
    createBullet(character.x + 12, character.y - 15); //if less create more bullets
  }
}
