export default class Character {
  constructor(x, y, image) {
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 80;
    this.image = image;
  }

  draw() {
    push();
    image(this.image, this.x, this.y, this.width, this.height);
    pop();
  }

  move() {
    if (keyIsDown(37)) {
      //move left
      this.speed = -8;
    } else if (keyIsDown(39)) {
      //move right
      this.speed = 8;
    } else {
      this.speed = 0;
    }
    this.x = this.x + this.speed;

    //making the character stop on the sides
    if (this.x < 0) {
      this.x = 0;
    } else if (this.x + this.width > 600) {
      this.x = 600 - this.width;
    }
  }
}
