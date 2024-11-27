let x = 85;
let y = 50;

function setup() {
  createCanvas(600, 800);
  character = new Character();
}

class Character {
  constructor(x, y) {
    this.characterX = 250;
    this.characterY = 600;
    this.speed = 0;
  }
  //character
  draw() {
    rect(this.characterX, this.characterY, 45, 80);
  }

  //making character move
  move() {
    this.characterX = this.characterX + this.speed;

    if (keyIsDown(37)) {
      //move left
      this.speed = -8;
    } else if (keyIsDown(39)) {
      //move right
      this.speed = 8;
    } else {
      this.speed = 0;
    }
  }
}

function gameScreen() {
  character.move();
  character.draw(250, 600);
}

function draw() {
  background(223, 229, 255);
  gameScreen();
}
