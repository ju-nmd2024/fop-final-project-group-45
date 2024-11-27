//Character
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
    this.width = 45;
    this.height = 80;
    this.speed = 0;
  }
  //character
  draw() {
    rect(this.characterX, this.characterY, this.width, this.height);
  }

  //making the character move sideways
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
    this.characterX = this.characterX + this.speed;

    //making the charcter stop on the sides
    if (this.characterX < 0) {
      this.characterX = 0;
    } else if (this.characterX + this.width > 600) {
      this.characterX = 600 - this.width;
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
