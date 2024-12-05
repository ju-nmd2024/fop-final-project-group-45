export default class Enemy {
  constructor(x, y, width, height) {
    this.enemyX = x;
    this.enemyY = y;
    this.width = width;
    this.height = height;
    this.downStep = 65;
    this.speed = 1;
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