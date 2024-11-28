/*
    Akademein invader 
    Alen Eminovic 
    Hedda Petersson
    NMD24
*/

function setup() {
  createCanvas(600, 800);
}

//Grid system
const gridLength = 12;
const gridSize = 60;
let counter = 0;

function drawGrid() {
  push();
  stroke(255, 255, 255);
  fill(0);
  for (let x = 0; x < gridLength; x++) {
    for (let y = 0; y < gridLength; y++) {
      rect(x * gridSize, y * gridSize, gridSize, gridSize);
    }
  }
  pop();
}

function draw() {
  drawGrid();
}

// class Enemy {
//   constructor(x, y) {
//     this.enemyX = 10;
//     this.enemyY = 10;
//     this.width = 45;
//     this.height = 80;
//   }

//   draw() {
//     fill(255);
//     rect(this.enemyX, this.enemyY, this.width, this.height);
//   }
// }

// function gameScreen() {
//   enemies.draw();
// }

// function draw() {
//   background(223, 229, 255);
//   gameScreen();
// }

// let x = 85;
// let y = 50;
// let enemies = [];

// function setup() {
//   createCanvas(600, 800);
// }

// class Enemy {
//   constructor(x, y) {
//     this.enemyX = 10;
//     this.enemyY = 10;
//     this.width = 45;
//     this.height = 80;
//   }

//   draw() {
//     fill(255);
//     rect(this.enemyX, this.enemyY, this.width, this.height);
//   }
// }

// function gameScreen() {
//   enemies.draw();
// }

// function draw() {
//   background(223, 229, 255);
//   gameScreen();
// }
