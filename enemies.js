let x = 85;
let y = 50;
let enemies = [];

function setup() {
  createCanvas(600, 800);
}

class Enemy {
  constructor(x, y) {
    this.enemyX = 10;
    this.enemyY = 10;
    this.width = 45;
    this.height = 80;
  }

  draw() {
    fill(255);
    rect(this.enemyX, this.enemyY, this.width, this.height);
  }
}

function gameScreen() {
  enemies.draw();
}

function draw() {
  background(223, 229, 255);
  gameScreen();
}
