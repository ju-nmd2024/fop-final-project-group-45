// let jibsBoyFront;
// function preload() {
//   jibsBoyFront = loadImage("./assets/jibsBoyFront.png");
// }

export default class Enemy {
  constructor(x, y, image) {
    this.enemyX = x;
    this.enemyY = y;
    this.width = 40;
    this.height = 65;
    this.downStep = 65;
    this.speed = 0.5;
    this.image = image;
  }

  draw() {
    push();
    image(this.image, this.enemyX, this.enemyY, this.width, this.height);
    pop();
  }

  move() {
    this.enemyX += this.speed;
  }

  moveDown() {
    this.enemyY += this.downStep;
    this.speed *= -0.5;
  }
}