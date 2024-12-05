// function setup() {
//   createCanvas(600, 800);
// }


export default class Enemy {
  constructor(x, y, width, height) {
    this.enemyX = x;
    this.enemyY = y;
    this.width = width;
    this.height = height;
    this.downStep = 65;
    this.speed = 1;
    // this.image = image;
  }

  draw() {
    push();
    image(jibsBoyFront, this.enemyX, this.enemyY, this.width, this.height);
    pop();
  }

  move() {
    this.enemyX += this.speed;
  }

  moveDown() {
    this.enemyY += this.downStep;
    this.speed *= -1;
  }
}
// const enemy = new Enemy(10, 10, 30, 40);

// let enemies = [];
// let rows = 5;
// let columns = 8;

// for (let i = 0; i < rows; i++) {
//   for (let j = 0; j < columns; j++) {
//     let x = 50 + j * 50;
//     let y = 50 + i * 50;
//     enemies.push(new Enemy(x, y, 30, 40));
//   }
// }

// function draw() {
//   background(255);
// let edgeReached = false;

// for (let enemy of enemies) {
//   enemy.draw();
//   enemy.move();

//   //maked that enemies have reached an edge
//   if (enemy.enemyX <= 0 || enemy.enemyX + enemy.width >= 600) {
//     edgeReached = true;
//   }
// }
// help from https://chatgpt.com/share/6748c9dc-037c-8000-a2b5-490cf0a04f03
// if (edgeReached) {
//   for (let enemy of enemies) {
//     enemy.speed *= -0.5;
//     enemy.moveDown();
//     } //help ended
//   }
// }
