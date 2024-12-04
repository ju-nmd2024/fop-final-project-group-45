export default class RedBull {
    constructor(x, y, width, height) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
    }
  
    draw() {
      push();
      image(redBullImage, this.x, this.y, this.width, this.height);
      pop();
    }
  }