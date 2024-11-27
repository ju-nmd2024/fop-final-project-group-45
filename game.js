function preload() {
  jthBoyBack = loadImage("/assets/jthBoyBack.png");
}

function setup() {
  createCanvas(600, 800);
  character = new Character(0, 0);
}

class Character {
  constructor(x, y) {
    this.characterX = x;
    this.characterY = y;
  }

  draw() {
    image(jthBoyBack, this.characterX, this.characterY);
  }
  characterMove() {}
}

function draw() {
  character.draw();
}
