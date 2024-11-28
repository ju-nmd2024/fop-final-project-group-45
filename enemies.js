class Enemy {
  constructor(x, y, width, height) {
    this.enemyX = x;
    this.enemyY = y;
    this.enemyWidth = width;
    this.enemyHeight = height;
  }

  draw() {
    push();
    fill(255);
    rect(this.enemyX, this.enemyY, this.enemyWidth, this.enemyHeight);
    pop();
  }
}
