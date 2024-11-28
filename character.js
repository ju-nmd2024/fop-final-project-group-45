//character

class Character {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  draw() {
    push();
    translate(this.x, this.y);
    noStroke();
    fill(255, 230, 0);
    rect(0, 0, this.width, this.height);
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

const yellowCharacter = new Character(250, 600, 45, 80);

function draw() {
  clear();
  yellowCharacter.draw();
  yellowCharacter.move();
}
