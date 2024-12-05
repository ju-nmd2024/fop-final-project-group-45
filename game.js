/*
  Final Project - Foundations of Programming TGPG14 T4410
    Game - Akademien Invaders

  Alen Eminovic - emal24na 
  Hedda Petersson - pehe24kv
  NMD24
*/

//Imported files
//
import Button from "./startScreen.js";
import Character from "./character.js";
import Bullet from "./bullet.js";
import EnemyBullet from "./bulletEnemy.js";
import Enemy from "./enemies.js";



let jthBoyBack;
let hlkBoyFront;
let jibsBoyFront;
let jthGirlFront; 
let eyBro;
let freeze;
let gameBackground;
let winScreen;
let lostScreen;
let startImage;
let howTo;
let akademien;
let nmdFadders; 
let overlayImage; 
let randomImg;

//Imported Images 
//
//Help through https://p5js.org/reference/p5/loadImage/ Accessed: 2024-11-30
function preload() {
  jthBoyBack = loadImage("./assets/jthBoyBack.png"); 
  hlkBoyFront = loadImage("./assets/hlkBoyFront.png");
  jibsBoyFront = loadImage("./assets/jibsBoyFront.png");
  jthGirlFront = loadImage("./assets/jthGirlFront.png");
  eyBro = loadImage("./assets/eyBro.png");
  freeze = loadImage("./assets/freeze.png");
  gameBackground = loadImage("./assets/gameBackground.png");
  winScreen = loadImage("./assets/winScreen.png");
  lostScreen = loadImage("./assets/gameOver.png"); 
  startImage = loadImage("./assets/startImage.png");
  howTo = loadImage("./assets/howTo.png");
  akademien = loadImage("./assets/akademien.png");
  nmdFadders = loadImage("./assets/nmdFadders.png");
  overlayImage = loadImage("./assets/overlay.png");
  let img = [hlkBoyFront, jibsBoyFront, jthGirlFront];
  randomImg = Math.floor(Math.random()*img.length);
}
window.preload = preload; 
//help from p5 ended




//variables
//
//
let characterX = 300; 
let characterY = 700;
let overlayX = 0;
let overlayY = 0;
let overlaySpeed = 1;
let enemyX = 10;
let enemyY = 10;
let state = "start";
let enemies;
const baseEnemies = [];
let enemyBullets = [];
let maxBullets = 3;
let score = 0;
let lives = 3;

//

//
function setup() {
  createCanvas(600, 800);
  let bullets = [];

  // create enemies 8x5 - 40 width 65 height.
for (let x = 0; x < 8; x++) {
  for (let y = 0; y < 5; y++) {
    //positions for enemies
    const enemyX = x * (40 + 10);
    const enemyY = y * (65 + 10);
    
    const enemy = new Enemy(enemyX, enemyY, 40, 65);
    baseEnemies.push(enemy); 
  } 
}  

// for (let i = 0; i < 5; i++) {  //5 = rows
//   for (let j = 0; j < 8; j++) { //8 = columns
//     let enemyX = 0 + j * 60;
//     let enemyY = 60 + i * 70;
//     const enemy = new Enemy(enemyX, enemyY, 40, 65);
//     baseEnemies.push(enemy); 
//   }
// }
enemies = [...baseEnemies];
}
window.setup = setup;

//Start button, changes to game Screen
const startButton = new Button(175, 300, 250, 60, "Start the game", () => {
  state = "markus";
});
//play again button, restarts the game
const playAgain = new Button(175, 220, 250, 60, "Play Again", () => {
  state = "game";
});
//menu button
const mainMenu = new Button(175, 300, 250, 60, "Main Menu", () => {
  state = "start";
});

//Create character
const character = new Character(characterX, characterY, 50, 80);







// Start screen
//
//
function startScreen() {
  image(startImage, 0, 0, 600, 800);
  startButton.draw();
  startButton.hitTest(175, 300);
}


//image screens
//
//
function instructions1() {
  image(nmdFadders, -1, -63, 600, 882); 
}

function instructions2() {
  //akademien outside
  image(akademien, -2, -80, 600, 900); 
}

function instructions3() { 
  //guide
  image(howTo, 0, 0, 605, 810);
}

//overlay for gameplay
function overlay() {
  image(overlayImage, overlayX - 100, overlayY - 100, 900, 1200);
  overlayX = overlayX + overlaySpeed;
  if (overlayX > 0) {
    overlaySpeed = overlaySpeed * -1; 
  } else if (overlayX < -100) {
    overlaySpeed = overlaySpeed * -1;
  }
}
//
//
//

//Creating hit boxes for enemies
//Help from first year NMD student Tyra Edin
//
//
function collisionEnemy(enemy, bullet) {
  return ( 
    bullet.x < enemy.enemyX + enemy.width &&
    bullet.x + bullet.width > enemy.enemyX &&
    bullet.y < enemy.enemyY + enemy.height &&
    bullet.y + bullet.height > enemy.enemyY
  );
}

//Creating hit boxes for enemies
function collisionCharacter(character, enemyBullet) {
  return (
    enemyBullet.x < character.x + character.width &&
    enemyBullet.x + enemyBullet.width > character.x &&
    enemyBullet.y < character.y + character.height &&
    enemyBullet.y + enemyBullet.height > character.y
  );
}
//
//
//Help from student, ended.

//Game screen
function gameScreen() {
  image(gameBackground, -50, 0, 685, 800);


  let edgeReached = false;

  //Loop through enemies and move them
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
        break; //make the enemies not glitch
        //Help from student Erik Sandquist ended
      }
    }
  }
 

  //Help from second year NMD student Erik Sandquist
  for (let j = 0; j < enemyBullets.length; j++) {
    let enemyBullet = enemyBullets[j];
    if (collisionCharacter(character, enemyBullet)) {
      //Help from student Erik Sandquist ended

      enemyBullets.splice(j, 1); //splice removes bullet
      lives = lives - 1;
    }
  }



  if (edgeReached) {
    for (let enemy of enemies) {
      enemy.moveDown();
    }
  }



  // Draw the character and make it move
  character.draw();
  character.move();



  // Draw the bullets
  for (let bullet of bullets) {
    if (bullet.y <= 0) {
      bullets.splice(bullet, 1);
    } else {
      bullet.move();
      bullet.draw();
    }
  }


  //Generated via https://chatgpt.com/share/675038de-6e2c-8000-84d7-5465e33bc7e5 Accessed: 2024-12-04
  //Used ChatGPT to fix the issues in our code
  for (let i = 0; i < enemyBullets.length; i++) {
    let enemyBullet = enemyBullets[i];
    if (enemyBullet.y >= 800) { 
      enemyBullets.splice(i, 1);
      i--;
    } else {
      enemyBullet.move();
      enemyBullet.draw();
    }
  }

  if (Math.random() < 0.02) {
    let randomEnemy = enemies[Math.floor(Math.random() * enemies.length)];
    createEnemyBullet(
      randomEnemy.enemyX + randomEnemy.width / 2,
      randomEnemy.enemyY + randomEnemy.height
    );
  }
  //End of citation


  //calling the lights function
  overlay();
  
  if (lives === 0) {
    state = "gameOver";
  }

  if (enemies.length === 0) {
    state = "win";
  }

  // if (score === 400) {
  //   text("level 2", 500, 35);
  // }
  
  //Scores
  push();
  textSize(20);
  fill(255);
  //Help from second year NMD student Erik Sandquist
  text(`SCORE: ${score}`, 25, 35);
  //End of help from Erik Sandquist
  pop();

  //Lives
  push();
  textSize(20);
  fill(255);
  //Help from second year NMD student Erik Sandquist
  text(`LIVES: ${lives}`, 500, 35);
  //End of help from Erik Sandquist
  pop();
}


//Game over screen
function gameOver() {
  image(lostScreen, 0, 0, 600, 800);
  playAgain.draw();
  mainMenu.draw();
  push();
  textSize(25);
  fill(255);
  text(`SCORE: ${score}`, 240, 55);
  pop();
}

//Win screen
function win() {
  image(winScreen, 0, 0, 600, 800);
  playAgain.draw();
  mainMenu.draw();
  push();
  textSize(25);
  fill(255);
  text(`SCORE: ${score}`, 240, 55);
  pop();
}

function resetGame() {
  lives = 3;
  enemyX = 0;
  enemyY = 0;  
  bullets = [];
  
  if(enemies.length === 0){
    enemies = [...baseEnemies];
  } else {
    enemies = [];
    for (let i = 0; i < 5; i++) {  //5 = rows
      for (let j = 0; j < 8; j++) { //8 = columns
        let enemyX = 0 + j * 60;
        let enemyY = 60 + i * 70;
    
        const enemy = new Enemy(enemyX, enemyY, 40, 65);
        enemies.push(enemy); 
        // console.log(enemy);
      }
    }   
    
  }
} 

function draw() {
  if (state === "start") {
    startScreen();
  } else if (state === "markus") {
      instructions1();
  } else if (state === "akademienScreen") {
      instructions2();
  } else if (state === "howTo") {
    instructions3();
  } else if (state === "game") {
    gameScreen();
  } else if (state === "gameOver") {
    resetGame(); 
    gameOver();
  } else if (state === "win") {
    resetGame();
    win();
  }
}
window.draw = draw;

function mouseClicked() {
  if (state === "start") {
    startButton.mouseClicked(); // added buttons on start screen
  } else if (state === "markus") {
    state = "akademienScreen";
  } else if (state === "akademienScreen") {
    state = "howTo";
  } else if (state === "howTo") {
      state = "game";
  } else if (state === "win") {
    //added buttons on win screen
    playAgain.mouseClicked();
    mainMenu.mouseClicked();
  } else if (state === "gameOver") {
    //added buttons on gameover screen
    playAgain.mouseClicked();
    mainMenu.mouseClicked();
  }
}
window.mouseClicked = mouseClicked;

function createBullet(x, y) {
  let bullet = new Bullet(x, y, 20, 32);
  bullets.push(bullet);
}

//Generated via https://chatgpt.com/share/675038de-6e2c-8000-84d7-5465e33bc7e5 Accessed: 2024-12-04
//Used ChatGPT to fix the issues in our code, added the suggested parameters
function createEnemyBullet(x, y) {
  let enemyBullet = new EnemyBullet(x, y, 25, 20);
  enemyBullets.push(enemyBullet);
}
//End of citation

function keyPressed() { 
  if (key === " " && bullets.length < maxBullets) {
    //checks if bullets are less than 3, the max length of array
    createBullet(character.x + 12, character.y - 15); //if less create more bullets
  }
}
window.keyPressed = keyPressed;