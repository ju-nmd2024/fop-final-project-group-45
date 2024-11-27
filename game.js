/*
    Akademein invader 
    Alen Eminovic 
    Hedda Petersson
    NMD24
*/

//Character
let x = 85;
let y = 50;
let enemies = [];

function setup() {
  createCanvas(600, 800);
  character = new Character();
  enemies = new Enemy();
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

  //making character move
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

    if (this.characterX < 0) {
      this.characterX = 0;
    } else if (this.characterX + this.width > 600) {
      this.characterX = 600 - this.width;
    }
  }
}

class Enemy {
  constructor(x, y) {
    this.enemyX = 10;
    this.enemyY = 10;
    this.width = 45;
    this.height = 80;
  }

  draw() {
    fill(255);
    rect(this.enemyX, this.enemyY, this.width, this.height);
  }
}

function gameScreen() {
  character.move();
  character.draw(250, 600);
  enemies.draw();
}

function draw() {
  background(223, 229, 255);
  gameScreen();
}
