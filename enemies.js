function setup() {
  createCanvas(600, 800);
}

class Enemy {
  constructor(x, y, width, height) {
    this.enemyX = x;
    this.enemyY = y;
    this.height = height;
    this.width = width;
  }

  draw() {
    push();
    fill(0);
    rect(this.enemyX, this.enemyY, this.height, this.width);
    pop();
  }

  move(speed) {
    this.enemyX += speed;
  }
}
const enemy = new Enemy(250, 600, 45, 80);

let enemies = [];
let rows = 5;
let columns = 8;

for (let i = 0; i < rows; i++) {
  for (let j = 0; j < columns; j++) {
    let x = 50 + j * 50;
    let y = 50 + i * 50;
    enemies.push(new Enemy(x, y));
  }
}

function draw() {
  background(255);
  for (let Enemy of enemies) {
    Enemy.draw();
    Enemy.move(1);
  }
}
