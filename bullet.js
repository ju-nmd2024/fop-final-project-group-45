let bullets = [];

export default class Bullet {
  constructor(x, y, width, height, image) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = 15;
    this.image = image;
  }

  move() {
    this.y = this.y - this.speed;
    this.speed *= 0.99;
  }

  draw() {
    push();
    image(this.image, this.x, this.y, this.width, this.height);
    pop();
  }

  shot() {
    return this.y + this.height < 0;
  }
}
