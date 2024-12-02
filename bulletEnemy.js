export default class BulletEnemy {
    constructor(x, y, width, height) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.speed = 15;
    }
  
    move() {
      this.y = this.y + this.speed;
      this.speed *= 0.99;
    }
  
    draw() {
      push();
      image(freeze, this.x, this.y, this.width, this.height);
      pop();
    }
  
    shot() {
      return this.y + this.height < 0;
    }
  }